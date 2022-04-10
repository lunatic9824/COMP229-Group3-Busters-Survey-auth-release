/*
Group project
Comp 229 Sec003
Winter 2022
*/


// create a reference to the model
let Survey = require('../models/survey');

// Gets all surveys from the Database and renders the page to list all surveys.
module.exports.surveyList = function(req, res, next) {  
    Survey.find((err, surveyList) => {
        // console.log(movieList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('survey/list', {
                title: 'Survey List', 
                surveys: surveyList
            })            
        }
    });
}

// Gets a survey by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    Survey.findById(id, (err, surveyToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/details', {
                title: 'Survey Details', 
                surveys: surveyToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    let newSurvey = Survey();

    res.render('survey/add_edit',{
        title : 'Add a new Survey',
        survey: newSurvey
    })
    
}

// Processes the data submitted from the Add form to create a new survey
module.exports.processAddPage = (req, res, next) => {

    
    let newSurvey = Survey({
        "_id": req.body.id,
        "Title": req.body.Title,
        "College": req.body.College,
        "Program": req.body.Program,
        "Delivery": req.body.Delivery,
        "Complexity": req.body.Complexity
    });

    Survey.create(newSurvey, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(item);
            res.redirect('/survey/list');
        }
    });


}

// Gets a survey by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    
    
    let surveyId = req.params.id;

    Survey.findById(surveyId, (err, editSurvey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('survey/add_edit', {
                title: 'Edit Survey', 
                survey: editSurvey,
                
            })
        }
    });
}

// Processes the data submitted from the Edit form to update a survey
module.exports.processEditPage = (req, res, next) => {
    
   

    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": req.body.id,
        "Title": req.body.Title,
        "College": req.body.College,
        "Program": req.body.Program,
        "Delivery": req.body.Delivery,
        "Complexity": req.body.Complexity
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey/list');
        }
    });
    
}

// Deletes a entry based on its id.
module.exports.performDelete = (req, res, next) => {
    
    

    let surveyId = req.params.id;

    Survey.remove({_id: surveyId}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey/list');
        }
    });

}