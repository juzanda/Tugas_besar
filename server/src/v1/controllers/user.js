const User = require('../models/user')
const CryptoJS = require('crypto-js')
const jsonwebtoken = require('jsonwebtoken')
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  const { password } = req.body
  try {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    )

    const user = await User.create(req.body)
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' }
    )
    res.status(201).json({ user, token })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.forgetPassword = async (req, res) => {
  const { username } = req.body
  const password = Math.random().toString(36).slice(-8)
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  try {
    const PasswordHash = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    )
    console.log(PasswordHash.toString()) 
    const user = await User.findOneAndUpdate({$or:[ {username},{email: username}] },{password:PasswordHash.toString()}).select('email')
    //send email reset
    console.log(user)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password reset',
      text: `Your new password is ${password}. You can use this password to log in to your account.`
    };
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Email sent: ${info.response}`);
        console.log(password)
      }
    });
    res.status(200).json('Unathorized')
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({$or:[ {username},{email: username}] }).select('password username')
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: 'username',
            msg: 'Invalid username or password'
          }
        ]
      })
    }

    const decryptedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8)

    if (decryptedPass !== password) {
      return res.status(401).json({
        errors: [
          {
            param: 'username',
            msg: 'Invalid username or password'
          }
        ]
      })
    }

    user.password = undefined

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' }
    )

    res.status(200).json({ user, token })

  } catch (err) {
    res.status(500).json(err)
  }
}