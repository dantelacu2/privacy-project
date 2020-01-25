const Company = require('../models/company');

exports.getAdminPassword = (req, res, next) => {
  res.render('adminPassword', {
    pageTitle: "Admin Authentication"
  })
}

exports.postAdminPassword = (req, res, next) => {
  enteredPassword = String(req.body.password);

  if (enteredPassword === "NOT REAL PASSWORD") { //password redacted for github.
    res.render('add-company', {
      pageTitle: 'Add Company',
      path: 'add-company',
      editing: false
    });
    return true;
  }
  else {
    res.render('apology', {message: "Password Invalid!"})
    return true;
  }
}

// exports.getAddCompany = (req, res, next) => {
//   res.render('add-company', {
//     pageTitle: 'Add Company',
//     path: 'add-company',
//     editing: false
//   });
// }

exports.postAddCompany = (req, res, next) => {
    const name = req.body.companyName;
    const privacyPolicy = req.body.policy;
    console.log(name);
    console.log(privacyPolicy);
    
    const company = new Company({
        name: name,
        privacyPolicy: privacyPolicy
    });
    company
      .save()
      .then(result => {
        // console.log(result);
        console.log('Created Policy');
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  };