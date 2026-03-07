import { transporter } from '../mail.js'

export async function testMail(req, res) {
  console.log('req.body:', req.body)
  const { email, content } = req.body

  try {
    await transporter.sendMail({
      from: '测试邮件 <3845292162@qq.com>',
      to: email,
      subject: '魔法少女的秘密测试邮件',
      text: content,
    })

    res.json({ message: '邮件发送成功' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '邮件发送失败' })
  }
}
