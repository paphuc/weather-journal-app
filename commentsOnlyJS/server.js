// Empty JS object to act as endpoint for all routes
projectData = {};

// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cros');
app.use(cors());

// Initialize the main project folder
app.use(express.static('weather-journal-app'));

// Spin up the server
const port = 3000;
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};
// Callback to debug
const server = app.listen(port, listening);

// Initialize all route with a callback function
app.get('/all', callBack);
// Callback function to complete GET '/all'
function callBack(req, res) {
    res.send(projectData);
};

// Post Route
app.post('/add', callBack);
function callBack(req, res) {
    res.send('Post received');
};