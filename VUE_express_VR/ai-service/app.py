from fastapi import FastAPI, File, UploadFile
from ultralytics import YOLO
from PIL import Image
import io
import os
import uuid
import uvicorn
from yolo_infer import detect_and_save
from db import insert_record, get_latest_records, init_db


app = FastAPI()
init_db()
# ==============================
# 配置
# ==============================
# 英文 → 中文映射
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
from fastapi.concurrency import run_in_threadpool
@app.post("/detect")
async def detect_image(image: UploadFile = File(...)):
    contents = await image.read()

    raw_filename = f"{uuid.uuid4()}.jpg"
    raw_path = os.path.join(UPLOAD_DIR, raw_filename)

    with open(raw_path, "wb") as f:
        f.write(contents)

    result_filename, detections = detect_and_save(raw_path)

    if detections:
        await run_in_threadpool(
            lambda: [
                insert_record(
                    det["label"],
                    det["confidence"],
                    f"/uploads/{result_filename}"
                )
                for det in detections
            ]
        )

    return {
        "image_url": f"/uploads/{result_filename}",
        "detections": detections
    }

@app.get("/history")#新增历史记录接口
def get_history():
    records = get_latest_records(10)
    return {"records": records}

# 允许前端访问 uploads 目录
from fastapi.staticfiles import StaticFiles
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ==============================
# 启动
# ==============================

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )