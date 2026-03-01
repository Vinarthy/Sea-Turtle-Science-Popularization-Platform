import sqlite3
import os
from datetime import datetime

DATABASE = "turtle_ai.db"


def get_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    c = conn.cursor()

    c.execute("""
        CREATE TABLE IF NOT EXISTS detection_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            detect_time TEXT NOT NULL,
            class_name TEXT NOT NULL,
            confidence REAL NOT NULL,
            result_img_path TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()


def insert_record(class_name, confidence, result_img_path):
    conn = get_connection()
    c = conn.cursor()

    c.execute("""
        INSERT INTO detection_history
        (detect_time, class_name, confidence, result_img_path)
        VALUES (?, ?, ?, ?)
    """, (
        datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        class_name,
        confidence,
        result_img_path
    ))

    conn.commit()
    conn.close()


def get_latest_records(limit=10):
    conn = get_connection()
    c = conn.cursor()

    c.execute("""
        SELECT * FROM detection_history
        ORDER BY detect_time DESC
        LIMIT ?
    """, (limit,))

    rows = [dict(row) for row in c.fetchall()]
    conn.close()
    return rows
#db里面有东西了但是没传进前端