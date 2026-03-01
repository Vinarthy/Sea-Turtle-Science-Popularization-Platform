// server/services/pythonService.js
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

// 调用 Python 微服务进行识别
const callPythonService = async (filePath) => {
  const formData = new FormData()
  formData.append('image', fs.createReadStream(filePath))

  const response = await axios.post('http://localhost:8000/detect', formData, {
    //将图片请求跨段传输至python端
    headers: formData.getHeaders(),
  })

  return response.data
}

export { callPythonService }
