const express = require("express");
const path = require('path');
const {PythonShell} = require('python-shell')
// const analyzeText = require('../analyzeText');
const Company = require('../models/company');
const Sentiment = require('sentiment');
const math = require('mathjs');

const router = express.Router();

router.post('/companyPage', (req, res, next) => {

    let companyName = String(req.body.searchQuery);
    
    Company.findOne({ 'name': {$regex: companyName, $options: 'i'}}, 'name privacyPolicy', function (err, content) {
        if (err) return handleError(err);
        if (content === null) {
            // console.log("this has run");
            let message = "we don't have a company named " + companyName + " in our database.";
            res.render('apology', {message: message});
            return true;
        }
        let policy = content.privacyPolicy;

        var sentiment = new Sentiment();
        var result = sentiment.analyze(policy);
        
        // compute the comparative score -50 to 50.
        comparativeScore = math.round(1000 * result.comparative, 0);

        res.render('company', {searchQuery: content.name, info: comparativeScore})

    });
});

//find policy post page
router.post('/findPolicy', (req, res, next) => {
    console.log(req.body.searchQuery);
    const pathTo = path.join(__dirname, "../", "scripts");

    splitQuery = req.body.searchQuery.split(" ");

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: pathTo,
        args: splitQuery
    };
    
    PythonShell.run('primary.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        res.render('company', {pageTitle: 'Matched Company', searchQuery: req.body.searchQuery, info: results[0]})
    });
});

router.get('/', (req, res, next) => {
    res.render('newMain', {pageTitle: 'Privacy Information'});
});

module.exports = router;