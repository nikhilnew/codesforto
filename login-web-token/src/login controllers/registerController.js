const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('./../../config/db.config').promise();
var nodemailer = require("nodemailer");
const express = require("express");
const app = express();
app.use(express.json());
exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {

    ////---------------------------already exists--------------------------------------------------------------
    const [rowFindUser] = await conn.execute('SELECT * FROM invite_users WHERE email = ?', [req.body.Email])
    console.log('.................................', rowFindUser);
    if (rowFindUser?.length > 0) {
      return res.json({
        message: "Email is already exists",
        success: false,
      });
    }
    //-------------------------------------------------------------------------------------------------------
    const hashPass = await bcrypt.hash(req.body.Password, 12);
    const [rows] = await conn.execute('call sendquickmail_db.Ragistration (?,?,?,?)',

      [

        req.body.Name,
        req.body.Username,
        req.body.Email,
        hashPass,

      ]);

    if (rows.affectedRows === 1) {
      //...............connection port in gmail---------------
      var transporter = nodemailer.createTransport({

        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
          user: "maneeshy440@gmail.com",
          pass: "wjnkxqtdsjipamxc"


        },

      });
      var mailOptions = {
        from: "maneeshy440@gmail.com",
        to: req.body.Email,
        subject: "You are Registered Successfully",

        // ------------------------Html Code Started-------------------------------------------
        html: "Hii" + " " + req.body.Name + "," + "<br>" +

          "<br>This is a Registered details that has to be filled by Nikhil'team.<br>" +

          "<br>Please find the Login Credentials below for completing your Registration Process:<br>" +

          "<br>Display name:" + " " + req.body.Name +
          "<br>Email:" + "  " + req.body.Email +
          "<br>Username:" + " " + req.body.Username +
          "<br>Password:" + " " + req.body.Password + "<br><br>" +
          "<br>Note: " + " Please let me know if you need any clarifications." + "<br>" +


          "<br>Thanks & Regards,<br>" +
          "Nikhil Kurmi<br>"

      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email has been sent", info.response);
        }

      });

      const [rows1] = await conn.execute('SELECT * FROM invite_users WHERE email = ?', [req.body.Email])



      console.log(',,,,,,,,,,,,,,,,,,lwekjfklewh', rows1);
      //................
      return res.status(201).json({
        message: "The user has been successfully inserted",
        Data: rows1[0],
        success: true,

      });
    }

  }
  catch (err) {
    next(err);
  }

}
