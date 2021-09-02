const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  validationResult
} = require('express-validator');

const {
  secret
} = require("../config");

// Generate Access Token
const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, secret, {
    expiresIn: "24h"
  })
};

// Registration new user
exports.registration = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Ошибка при регистрации",
        errors
      });
    }

    const {
      username,
      email,
      password
    } = req.body;

    const candidate = await User.findOne({
      username
    });

    const foundMail = await User.findOne({
      email
    });

    if (candidate) {
      return res.status(400).json({
        message: "Пользователь с таким именем уже существует"
      })
    }

    if (foundMail) {
      return res.status(400).json({
        message: "Пользователь с таким email уже существует"
      })
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({
      value: "USER"
    });

    const user = new User({
      username,
      password: hashPassword,
      roles: [userRole.value],
      email
    });

    await user.save();
    /* return res.json({
      message: "Пользователь успешно зарегистрирован"
    }); */

    exports.login(req, res);

  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: 'Registration error'
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;

    const user = await User.findOne({
      username
    });

    if (!user) {
      return res.status(400).json({
        message: `Пользователь ${username} не найден`
      })
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: `Введен неверный пароль`
      });
    }

    const token = generateAccessToken(user._id, user.roles);

    return res.json({
      token
    });

  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: 'Login error'
    });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);

  } catch (e) {
    console.log(e);
  }
}