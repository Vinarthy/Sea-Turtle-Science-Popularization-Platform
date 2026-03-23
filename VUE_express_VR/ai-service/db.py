import mysql.connector
from datetime import datetime

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "720053",
    "database": "turtle_app"
}


def get_connection():  # 建立连接
    return mysql.connector.connect(**DB_CONFIG)


def init_db():  # 初始化表
    conn = get_connection()
    c = conn.cursor()

    c.execute("""
        CREATE TABLE IF NOT EXISTS detection_history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            detect_time DATETIME NOT NULL,
            class_name VARCHAR(255) NOT NULL,
            confidence FLOAT NOT NULL,
            result_img_path VARCHAR(500) NOT NULL
        )
    """)

    conn.commit()
    conn.close()


def insert_record(class_name, confidence, result_img_path):  # 插入记录
    conn = get_connection()
    c = conn.cursor()

    c.execute("""
        INSERT INTO detection_history
        (detect_time, class_name, confidence, result_img_path)
        VALUES (%s, %s, %s, %s)
    """, (
        datetime.now(),
        class_name,
        confidence,
        result_img_path
    ))

    conn.commit()
    conn.close()


def get_latest_records(limit=10):  # 查询最新记录
    conn = get_connection()
    c = conn.cursor(dictionary=True)

    c.execute("""
        SELECT * FROM detection_history
        ORDER BY detect_time DESC
        LIMIT %s
    """, (limit,))

    rows = c.fetchall()
    conn.close()
    return rows
#db里面有东西了但是没传进前端