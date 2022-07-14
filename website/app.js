/* Global Variables */
const units = '&units=imperial';
const apiKey = 'a15828f41611a50ae523ae36f855361f';
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// postData helps to store data into our server
const postData = async(url = '', data = {}) => {
    console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        // console.log(newData);
        return newData
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

// getTemp fetch data from openweathermap, then call our POST api /add to store data
const getTemp = async() => {
    const response = await fetch(baseURL + apiKey);

    try {
        const newData = await response.json();
        console.log(newData);
        const zip = document.getElementById('zip').value;
        const feelings = document.getElementById('feelings').value;
        const content = "Zip code: " + zip + ". Feeling: " + feelings;
        postData('/add', {
            "date": newDate,
            "feel": content,
            "temp": newData.list[0].main.temp
        });
        retrieveData()
        return newData
    } catch (error) {
        console.log("error", error);
    }
}

document.getElementById('generate').addEventListener('click', performAction);

// performAction control the action for click event
function performAction(e) {
    getTemp(baseURL + apiKey)
}

// retrieveData fetch data 
const retrieveData = async() => {
    const response = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await response.json()
        console.log(allData)
            // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById("date").innerHTML = allData.date;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}