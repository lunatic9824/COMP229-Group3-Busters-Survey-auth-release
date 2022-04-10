/*
Group project
Comp 229 Sec003
Winter 2022
*/

var express = require('express');
var router = express.Router();

let surveyController = require('../controllers/survey');

// Router for lists movies function
router.get('/list', surveyController.surveyList);

// Router for movie details function
router.get('/details/:id', surveyController.details);

// Routers for edit functions
router.get('/edit/:id', surveyController.displayEditPage);
router.post('/edit/:id', surveyController.processEditPage);

// Router for Delete function
router.get('/delete/:id', surveyController.performDelete);

// Routers for Add functions
router.get('/add', surveyController.displayAddPage);
router.post('/add', surveyController.processAddPage);


module.exports = router;