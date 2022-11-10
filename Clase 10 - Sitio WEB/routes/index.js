var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (_req, res, _next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, _res, _next) => {

  console.log(req.body)

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;

  var obj = {
    to: 'isabelortelli1@gmail.com',
    subject: 'CONTACTO WEB',
    html: nombre + " " + apellido + " se contacto a traves de la web y quiere mas informacion a este correo" + email + " , su telefono es: " + telefono
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })

  var info = await transport.sendMail(obj);

  _res.render('index', {
   message: 'Mensaje enviado correctamente'
  })
});

module.exports = router;
