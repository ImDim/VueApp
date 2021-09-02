module.exports = app => {
  const auth = require('../controllers/Auth.js')
  const {
    check
  } = require("express-validator")


  /* const Recaptcha = require('express-recaptcha').RecaptchaV3;
  const recaptcha = new Recaptcha('6Let-jwcAAAAAAWcTuKMJkJkJvu9d0Xwt-SHdCWg', '6Let-jwcAAAAALaNpc0Ju_vEIvsb8McQRo3ob0-D'); */

  const recaptchaMiddleware = require('../middleware/recaptcha')

  //const authMiddleware = require('../middleware/authMiddleware')
  const roleMiddleware = require('../middleware/role')

  var router = require("express").Router();

  router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({
      min: 4,
      max: 10
    })
  ], auth.registration);

  router.post('/login', recaptchaMiddleware, auth.login);

  router.get('/users', roleMiddleware(["ADMIN"]), auth.getUsers);

  app.use('/api/auth', router);
};