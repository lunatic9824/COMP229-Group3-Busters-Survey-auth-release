/*
Group project
Comp 229 Sec003
Winter 2022
*/
function requireAuth(req,res,next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

var express = require('express');
var router = express.Router();

let surveyController = require('../controllers/survey');

// Router for lists movies function
router.get('/list',requireAuth, surveyController.surveyList);

// Router for movie details function
router.get('/details/:id',requireAuth, surveyController.details);

// Routers for edit functions
router.get('/edit/:id',requireAuth, surveyController.displayEditPage);
router.post('/edit/:id',requireAuth, surveyController.processEditPage);

// Router for Delete function
router.get('/delete/:id',requireAuth, surveyController.performDelete);

// Routers for Add functions
router.get('/add',requireAuth, surveyController.displayAddPage);
router.post('/add',requireAuth, surveyController.processAddPage);


module.exports = router;