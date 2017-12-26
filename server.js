const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) => {
        if (err) console.log('Unable to append to server.log.')
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle:'Oh No!',
//         message:'we will return shortly...',
//     });
//     // setTimeout(() => {
//     //     next();
//     // }, 2000);
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt',text => text.toUpperCase() );

app.get('/', (req, res) => {
    //res.send('<h2>HELLO</h2>');
   res.render('home.hbs',{
    pageTitle:'Homepage',
    message:'welcome to the homepage!'
   });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle:'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage:'Error: bad request'
    })
})

app.listen(port,() => {
    console.log(`server is up at 'localhost:${port}'`);
});