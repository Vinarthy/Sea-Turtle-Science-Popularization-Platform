// server/server.js
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { register, login, logout } from './Controll/authController.js'
import { verifyToken } from './authMiddleware.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { uploadFile, deleteFile } from './uploadController.js'
import { callPythonService } from './pythonService.js'
import { testMail } from './Controll/mailControlTry.js'
import articleRoutes from './articleRoutes.js'

const app = express()
//3.2新增：只允许5173的访问后端
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(cookieParser()) //解析cookie
app.use(express.json()) //解析JSON请求体
const PORT = process.env.PORT || 3000 //指定后端端口为5173端口

app.post('/api/register', register) //认证路由
app.post('/api/login', login)
app.post('/api/logout', logout)

app.get('/api/me', verifyToken, (req, res) => {
  //把登录后的id返回给前端
  res.json({ userId: req.user.id })
})
/* ==============================
   路径解析
============================== */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Vue build 输出目录
const DIST_DIR = path.join(__dirname, '../dist')
// Unity WebGL build 目录
const UNITY_DIR = path.join(__dirname, '../dist/unity-build')
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
app.post('/api/testMail', testMail) //给测试邮箱路径套上路由

//以下是视频展示模块
app.get('/api/videos', (req, res) => {
  res.json([
    {
      id: 1,
      title: '海龟纪录片',
      url: 'http://localhost:8080/videos/webvideo.mp4',
      description: '记录海龟的生命周期',
    },
  ])
})
app.use('/videos', express.static(path.join(__dirname, '../videos')))
app.use('/api/articles', articleRoutes) //将文章模块加上路由
app.use('/article', express.static(path.join(__dirname, './public/article'))) //配置后端public文件

// 图片接口
app.get('/api/updateturtle', (req, res) => {
  res.json([
    { id: 1, url: '/updateturtle/Cinderella.gif' },
    { id: 2, url: '/updateturtle/Mabel.gif' },
    { id: 3, url: '/updateturtle/Martha.gif' },
  ])
})
app.use('/updateturtle', express.static(path.join(__dirname, './public/updateturtle')))
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
