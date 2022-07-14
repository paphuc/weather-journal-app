// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
// Spin up the server
const port = 3000;

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};
// Callback to debug
const server = app.listen(port, listening);

// Initialize all route with a callback function
app.get('/all', getAll);
// getAll function to send the object 
function getAll(req, res) {
    res.send(projectData);
};

// Post Route
app.post('/add', callBack);
// callBack function to set value into the object
function callBack(req, res) {
    projectData['date'] = req.body.date;
    projectData['feel'] = req.body.feel;
    projectData['temp'] = req.body.temp;
};