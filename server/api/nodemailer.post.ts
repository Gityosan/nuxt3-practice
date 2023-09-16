import { defineEventHandler, readBody } from 'h3'
import nodemailer from 'nodemailer'

const config = useRuntimeConfig()
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // SMTP の設定
  const options = {
    host: config.public.MAILSERVER, // メールサーバー
    port: 465, // ポート番号 25 など
    secure: true, // 465 番ポートを使う場合。それ以外は false
    requireTLS: false,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      // 認証情報
      user: config.public.MAILER_AUTH_USER, // ユーザー名
      pass: config.public.MAILER_AUTH_PASS // パスワード
    }
  }

  // メールの内容
  const mail = {
    from: config.public.MAILER_FROM_MAILADDRESS, // 送信元メールアドレス `"Sample Company" <no-reply@example.com>`なども可
    to: body.mailaddress, // 送信先メールアドレス
    subject: body.subject,
    text: body.name + `様\nお問い合せありがとうございます。`,
    html: '<h3>' + body.name + `様</h3>\n<p>お問い合せありがとうございます。</p>`
  }

  // メールの送信
  try {
    const transport = nodemailer.createTransport(options)
    const result = await transport.sendMail(mail)
    console.debug(result)
    return result
  } catch (err) {
    console.error(err)
  }
})
