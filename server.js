const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 8080
const nodemailer = require("nodemailer")

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function (req,res) {

    res.sendFile('/index.html', {root: __dirname });
  });

app.post('/enviado', (req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service:'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
          user: 'seuemail@email.com',
          pass: 'Senha@2021'
        }
      });

      let mailOptions = {
        from: 'emissor', // sender address
        to: "destino", // list of receivers
        subject: "Hello ✔", // Subject line
        text: `Name: ${req.body.nameComplete}, email: ${req.body.emailComplete}, message: ${req.body.messageComplete}`, // plain text body
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
        console.log('Email Options: ', mailOptions.text);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
})
app.listen(port, () => console.log(`Example app listening on port port!`))
 
 
 
 
 
 
 
