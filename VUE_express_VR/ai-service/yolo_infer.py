# yolo_infer.py
#对上传的图片进行框选
import os
import uuid
import cv2
from ultralytics import YOLO
# =========================
# 配置
# =========================

MODEL_PATH = "AI_models/yolo_best.pt"
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# 全局加载一次模型
model = YOLO(MODEL_PATH)
LABEL_MAP = {#中英文映射
    "Green_Turtle": "绿海龟",
    "Hawksbill": "玳瑁龟",
    "Leatherback": "棱皮龟",
    "Loggerhead": "红海龟",
    "Kemps_Ridley": "肯氏丽龟",
    "Olive_Ridley": "橄榄丽龟",
    "Flatback": "平背龟"
}
# =========================
# 核心推理函数
# =========================

def detect_and_save(image_path: str):
    """
    输入：原始图片路径
    输出：
        - 保存带框图片到 uploads
        - 返回 (saved_filename, detections)
    """

    img = cv2.imread(image_path)
    if img is None:
        raise Exception("无法读取图片")

    results = model.predict(
        source=img,
        conf=0.25,
        iou=0.45,
        save=False,
        show=False
    )

    detections = []

    for r in results:
        boxes = r.boxes
        if boxes is None:
            continue

        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            conf = float(box.conf[0])
            cls_id = int(box.cls[0])

            eng_label = model.names[cls_id]
            cn_label = LABEL_MAP.get(eng_label, eng_label)

            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

            text = f"{eng_label} {conf:.2f}"  # 框上先用英文避免乱码
            cv2.putText(img, text, (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

            detections.append({
                "label_en": eng_label,
                "label": cn_label,
                "confidence": round(conf, 3),
                "x1": x1,
                "y1": y1,
                "x2": x2,
                "y2": y2
            })
    # 保存带框图片
    filename = f"{uuid.uuid4()}_det.jpg"
    save_path = os.path.join(UPLOAD_DIR, filename)
    cv2.imwrite(save_path, img)

    return filename, detections