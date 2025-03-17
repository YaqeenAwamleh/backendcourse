// Import necessary modules
const { name } = require("ejs");
const express = require("express");
const app = express();


app.get("/", async(req, res) => {
    const response = await fetch ("https://api.tvmaze.com/");
    const data = await response.json()
    console.log(data);
    res.json(data.results);
});

app.get("/", async(req, res) => {
    const response = await fetch ("https://api.tvmaze.com/");
    const data = await response.json()
    console.log(data);
    res.json(data.results[0]);
});

app.get("/movieName", async(req, res) => { 
    const movieName = req.params.movieName;
    const response = await fetch (`https://api.tvmaze.com/search/shows?q=${movieName}`)
    const data = await response.json()
    console.log(data);
    const ourData ={ 
        name: data.results[0].name,
         period: data.results[0].period,
          rate: data.results[0].rate}
    
    res.json(ourData)
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log("the server running on port" + port);
});
