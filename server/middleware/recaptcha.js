const fetch = require('isomorphic-fetch');
const {
  recaptchaKey
} = require('../config')

module.exports = async (req, res, next) => {
  try {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaKey}&response=${req.body.recaptchaToken}`;

    let google_response = await fetch(url, {
      method: "POST"
    });

    google_response = await google_response.json();

    if (!google_response.success) {
      return res.status(400).json({
        message: 'Капча не действительна!'
      });
    }

    next();
  } catch (error) {
    console.log(error)
    return;
  }
};