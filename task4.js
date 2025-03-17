const { urlencoded, json } = require("body-parser");
const express = require("express");
const app = express();
app.use(urlencoded({ extended: true }));


let missions = [
    {
        id: "1",
        missionName: "Able 1",
        astronaut: ["Yaqeen", "Majd", "Farah"],
        progress: 34,
    },
    {
        id: "2",
        missionName: "Apollol",
        astronaut: ["Yaqeen", "Majeda", "Marah"],
        progress: 100,
    },
    {
        id: "1",
        missionName: "AirSTAR",
        astronaut: ["Yaqeen", "Ameera", "Zaina"],
        progress: 90,
    },
];

//create new mission
app.post("/mission", (req, res) => {
    const data = req.body;
    data.astronaut = JSON.parse(data.astronaut);
    missions.push(data);
    res.send("create mission");
});


//get all the missions
app.get("/missions", (req, res) => {
    res.send(missions);
});

//get specific mission
app.get("/mission/:id", (req, res) => {
    const pramsId = req.params.id;
    for (let i = 0; i < missions.length; i++) {
        if(missions[i].id === pramsId) {
            res.send(missions[i]);
        }
    }
    res.send("The mission is not found");
});


//edit on mission
app.put("/mission", (req, res) => {
    const data = req.body; 
    data.astronaut = JSON.parse(data.astronaut);
    console.log(data);
    
    for (let i=0; i < missions.length; i++) {
        if(missions[i].id === data.id){
            //update data
            missions[i] = data;
            res.send("update the mission");
        }
    }
    res.send("The mission is not found");
});


//delete mission
app.delete("/mission/:id", (req, res) => {
    const pramsId = req.id;
    for (let i = 0; i < missions.length; i++) {
        if(missions[i].id===pramsId) {
            missions = missions.filter((item) => item.id !== pramsId);
            res.send("The mission is deleted");
        }
    }
    res.send("The mission is not found");
});

const port = 3000;
app.listen(port, () => {
    console.log("the server running on port" + port);
});