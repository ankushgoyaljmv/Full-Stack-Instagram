// npm init -y
// npm i express 
// npm i nodemon --save-dev
// create start script in paclage.json => "start" : "nodemon crud/adpi.js"'
// package.json dir => start

const express = require("express");
const app = express();
const userDB = require("./user.json");
const fs = require("fs");
const { memory } = require("console");
// REST API 
// HTTP methods =>
// create  => POST
// read => GET
// app.get("/api/users", function (req, res) {
//     console.log("Recieved req");
//     res.status(200).json({
//         status: "success recieved get request from client",
//     })
// })

app.use(express.json());
//create => post
app.post("api/users", function (req, res) {
    let user = req.body;
    // db save 
    console.log(user);
    // if a new entry is created on server
    // memory => ram 
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    res.status(201).json({
        success: "successfull",
        user: user
    })
})
// update  => PATCH
// delete => DELETE
// localhost:3000/api/users 
app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})
