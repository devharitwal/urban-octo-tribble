
const x = require('qrcode');
const express = require('express');
const sanitizeInput = require('sanitize');



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
app.get('/', (req, res) => {
    res.render('index');
});





//routes 
app.post('/generate', (req, res) => {
    // here take the input from the form  and generate the QR code from it. 
    let data = req.body.url;

    if (data.length === 0) {
        data = "https://tinyurl.com/47a2w8zj";
    }
    x.toDataURL(data, (err, src) => {
        res.render('image', { image: src });
    });


});


app.listen(port);
