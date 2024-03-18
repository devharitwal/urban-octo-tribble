
const x = require('qrcode');
const express = require('express');
const sanitizeInput = require('sanitize');
const serverless = require('serverless-http');


const app = express();
const port = 8080;

const router = express.Router();



// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));
// Set the view engine to EJS

app.set('view engine', 'ejs');

//routes 
router.get('/index', (req, res) => {
    res.render('index');
});


//routes 
router.post('/generate', (req, res) => {
    // here take the input from the form  and generate the QR code from it. 
    let data = '';

    if (data.length === 0) {
        data = "https://tinyurl.com/47a2w8zj";
    }
    else {
        data = sanitizeInput(req.body.url);
    }
    x.toDataURL(data, (err, src) => {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <body>
                <h1>QR CODE  </h1>
                <img src= "${src}" />
                </body>
                </html>`
        );
    });


});

app.use('/.netlify/functions/api', router);

app.listen(port);


module.exports.handler = serverless(app);