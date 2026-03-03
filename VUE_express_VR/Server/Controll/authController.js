import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../db.js'

const JWT_SECRET = 'your_secret_key'
const EXPIRES_IN = '7d'

// QQ邮箱正则
const qqEmailRegex = /^[1-9][0-9]{4,10}@qq\.com$/

export async function register(req, res) {
  const { email, password } = req.body

  if (!qqEmailRegex.test(email)) {
    return res.status(400).json({ error: '必须使用QQ邮箱注册' })
  }

  const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email])

  if (existing.length > 0) {
    return res.status(400).json({ error: '该QQ已注册' })
  }

  const hashed = await bcrypt.hash(password, 10)

  await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashed])

  res.json({ message: '注册成功' })
}

export async function login(req, res) {
  const { email, password } = req.body

  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])

  if (rows.length === 0) {
    return res.status(400).json({ error: '用户不存在' })
  }

  const user = rows[0]

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    return res.status(400).json({ error: '密码错误' })
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  })

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.json({ message: '登录成功' })
}

export function logout(req, res) {
  res.clearCookie('token')
  res.json({ message: '已退出登录' })
}
