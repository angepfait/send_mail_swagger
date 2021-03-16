const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require ('dotenv').config()


//const Messsage = require('./test')
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


router.post('/',(req,res)=>{

   const {email} = req.body
  console.log(req.body);
   if (!EMAIL_REGEX.test(email)) {
     res.status(400).json({error:'email is not valid'})
   }else{
      res.status(200).json({success:'mesage send'})
      var transporter = nodemailer.createTransport({
         //service hotmail si l'on a un compte homail,yahoo si l'on a un compte yahoo
      service: 'gmail',
      auth: {
        user:process.env.EMAIL,
        pass: process.env.PASS
      }
      });
      var Messsage=`
      <!doctype html>
      <html>
      <head>
         <meta charset="utf-8">
      </head>
      <body>
         <p><img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
         <div style='font-weight:bold '>salut</div>
      </body>
      </html>
      `;
      var mailOptions = {
     // from: 'kkaparfait@gmail.com',
      from:process.env.EMAIL,
      to:email,
      subject: 'Sending Email with Node.js',
      html: Messsage
      };
   
      transporter.sendMail(mailOptions, function(error, info){
      if (error) {
         console.log(error);
      } else {
         console.log('Email sent: ' + info.response);
      }
      }); 
   } 
})

module.exports = router
