// server/server.js

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { uploadFile, deleteFile } from './uploadController.js'
import { callPythonService } from './pythonService.js'

const app = express()
const PORT = process.env.PORT || 3000
/* ==============================
   路径解析
============================== */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Vue build 输出目录
const DIST_DIR = path.join(__dirname, '../dist')
// Unity WebGL build 目录
const UNITY_DIR = path.join(__dirname, '../dist/unity-build')
app.use(express.json())
//以下为路由测试
app.get('/hello-test', (req, res) => {
  console.log('命中了 hello-test')
  res.send('ok')
})

/* =========================
   ① API 路由必须放在前面
========================= */
app.post('/api/detect', uploadFile, async (req, res) => {
  //前端传到后端的路由，但是没有传达到后端，对的
  try {
    const filePath = req.file.path
    const result = await callPythonService(filePath)
    console.log('Python 返回:', result)
    deleteFile(filePath)
    res.json(result)
  } catch (err) {
    console.error('检测异常:', err)
    res.status(500).json({ error: '检测失败' })
  }
})
/* ==================================================
   ① Unity 静态托管 (/unity)
   浏览器访问：/unity/index.html
================================================== */

// 处理 .br / .gz 压缩文件（WebGL必须）
app.use(
  '/unity-build',
  express.static(UNITY_DIR, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.gz')) {
        res.setHeader('Content-Encoding', 'gzip')
      }

      if (filePath.endsWith('.br')) {
        res.setHeader('Content-Encoding', 'br')
      }

      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript')
      }

      if (filePath.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm')
      }

      if (filePath.endsWith('.data')) {
        res.setHeader('Content-Type', 'application/octet-stream')
      }

      // 禁用缓存，避免304缓存脏数据
      res.setHeader('Cache-Control', 'no-store')
    },
  }),
)
app.use('/api/history', async (req, res) => {
  try {
    const response = await fetch('http://localhost:8000/history')
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'history proxy error' })
  }
})
// 普通文件
app.use(express.static(DIST_DIR))

// history fallback（关键）
// app.get(/^\/(?!api|unity).*/, (req, res) => {
//   res.sendFile(path.join(DIST_DIR, 'index.html'))
// })

app.listen(PORT, () => {
  console.log('-------------------------------')
  console.log(`Server: http://localhost:${PORT}`)
  console.log(`Unity:  http://localhost:${PORT}/unity`)
  console.log('-------------------------------')
})
