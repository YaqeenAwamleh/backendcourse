const express = require("express");
const app = express(); 

const mysql=require("mysql2");
const pool = mysql.createPool({
    host : "localhost",
    port: "3306",
    user: "root",
    Database: "introtobackend"
}).Promise();

// end piont
app.get("/users", async (req, res) =>{
    const data = await pool.execute("select * for users");
    console.log(data);
    res.send(data)
})


const port = 3000;
app.listen(port, () => {
    console.log("the server running on port" + port);
});