// npm init -y
// npm i express 
// npm i nodemon --save-dev
// create start script in paclage.json => "start" : "nodemon crud/adpi.js"'
// package.json dir => start

const express = require("express");
const app = express();
// REST API 
// HTTP methods =>
// create  => POST
// read => GET
app.get("/api/users", function (req, res) {
    console.log("Recieved req");
    res.status(200).json({
        status: "success recieved get request from client",
    })
})
// update  => PATCH
// delete => DELETE
// localhost:3000/api/users 
app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})
