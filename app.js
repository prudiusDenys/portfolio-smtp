const express = require('express')
const app = express()
const port = 3010

const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser')

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'prdslife@gmail.com', // generated ethereal user
    pass: 'Humanoid483', // generated ethereal password
  },
});

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

app.post('/sendMessage', async (req, res) => {

  let {name, email, phone, message} = req.body

  let info = await transporter.sendMail({
    from: 'Portfolio form', // sender address
    to: "prdslife@gmail.com", // list of receivers
    subject: "Message from my portfolio", // Subject line
    text: "", // plain text body
    html: `<b>Сообщение с вашего портфолио</b>
        <div>name: ${name}</div>
        <div>email: ${email}</div>
        <div>phone Number: ${phone}</div>
        <div>message: ${message}</div>`,
  });


  res.send('Successful')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})