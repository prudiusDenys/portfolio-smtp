const express = require('express')
const app = express()
const port = process.env.PORT || 3010;
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser')


app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())


let smtp_login = process.env.SMTP_LOGIN || '';
let smtp_password = process.env.SMTP_PASSWORD || '';

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'prdslife@gmail.com', // generated ethereal user
    pass: 'Humanoid483', // generated ethereal password
    type: 'login'
  },
});

app.post('/sendMessage', async (req, res) => {

  let {message, phone, email, name} = req.body

  let info = await transporter.sendMail({
    from: 'Portfolio form', // sender address
    to: "testdenis12345@gmail.com", // list of receivers
    subject: "Message from my portfolio", // Subject line
    html: `<b>Сообщение с вашего портфолио</b>
        <div>name: ${name}</div>
        <div>email: ${email}</div>
        <div>phone Number: ${phone}</div>
        <div>message: ${message}</div>`,
  });

  res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})