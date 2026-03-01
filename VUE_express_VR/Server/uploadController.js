// server/controllers/uploadController.js
import multer from 'multer'
import fs from 'fs'

// 设置 multer 配置
const upload = multer({ dest: 'uploads/' })

// 保存上传文件并返回路径
const uploadFile = (req, res, next) => {
  console.log('收到请求，content-type:', req.headers['content-type'])

  upload.single('image')(req, res, (err) => {
    if (err) {
      console.log('Multer 错误:', err)
      return res.status(500).json({ error: '上传失败' })
    }
    console.log('Multer 成功')
    console.log('req.file =', req.file)
    next()
  })
}

// 删除临时上传文件，对的，检测完了会自己删掉，但是filepath
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

export { uploadFile, deleteFile }
