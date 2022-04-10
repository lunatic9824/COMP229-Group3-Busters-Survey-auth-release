let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.DisplayHomePage);

/* GET home page. */
router.get('/home', indexController.DisplayHomePage);

/* GET - Display Login Page */
router.get('/login', indexController.DisplayLoginPage);

/* POST - Process Login Page */
router.post('/login', indexController.ProcessLoginPage);

/* GET - Display Register Page */
router.get('/register', indexController.DisplayRegisterPage);

/* POST - Process Register Page */
router.post('/register', indexController.ProcessRegisterPage);

/* GET to perform Logout */
router.get('/logout', indexController.PerformLogout);

module.exports = router;
