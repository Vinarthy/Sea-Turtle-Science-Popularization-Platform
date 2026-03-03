import jwt from 'jsonwebtoken'
import { db } from './db.js' // 根据你的实际路径调整

const JWT_SECRET = 'your_secret_key'

export async function verifyToken(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: '未登录' })
  }

  try {
    // 1. 验证 token 签名和有效期
    const decoded = jwt.verify(token, JWT_SECRET)

    // 2. 查询数据库，确认用户仍然存在
    const [rows] = await db.query('SELECT id FROM users WHERE id = ?', [decoded.id])

    if (rows.length === 0) {
      // 用户已被删除，清除无效的 cookie
      res.clearCookie('token')
      return res.status(401).json({ error: '用户不存在，请重新登录' })
    }

    // 3. 将用户信息挂载到 req 上，供后续路由使用
    req.user = decoded

    // 4. 放行
    next()
  } catch {
    // token 无效或过期，清除 cookie 并返回 401
    res.clearCookie('token')
    return res.status(401).json({ error: '登录已过期，请重新登录' })
  }
}
//报错信息检验如下：
