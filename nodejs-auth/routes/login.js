const loginController = require('../controllers/loginController');
const express = reuire('express');
const router = express.Router();
const login = require('../controllers/loginController');

router.route('/')
  .post(login.loginController);

router.route('/refresh').get(login.refresh);

module.exports = router;
