// import required node packages
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');

// import routes 
const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');

// initialize express.js
const app = express();

// allow certain objects including body-parser and static files like style.css and pug dynamic templates
app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'secondary-layout', extname: 'hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use(adminRoutes);
app.use(mainRoutes);

// 404 error if route is unknown
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});


mongoose
    .connect(
      'mongodb+srv://dantelacu:emxtL1nxStNIv7x8@cluster0-6qufv.mongodb.net/test?authSource=admin&retryWrites=true&w=majority',
      {
        useUnifiedTopology: true
      }
    )
    .then(result => {
      app.listen(8081, () => {
        console.log("Application running on port 4000!")
    });
    })
    .catch(err => {
      console.log(err);
    });