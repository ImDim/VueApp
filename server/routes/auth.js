module.exports = app => {
  const auth = require('../controllers/Auth.js')
  const {
    check
  } = require("express-validator")

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

  router.post('/login', auth.login);

  router.get('/users', roleMiddleware(["ADMIN"]), auth.getUsers);

  app.use('/api/auth', router);
};