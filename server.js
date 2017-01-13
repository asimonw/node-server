const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome mister!'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects', {
    pageTitle: 'Projects'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: '404 Page not found'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
