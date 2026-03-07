//验证码发送配置
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: '3845292162@qq.com',
    pass: '', //这是qq邮箱的授权码，后续换成域名的邮箱，放在被挖出来那我先藏在外面了
  },
})
//先暂时用我大号，后续用新手机注册个QQ邮箱，为了保障安全性
