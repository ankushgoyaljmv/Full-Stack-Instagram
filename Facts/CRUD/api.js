// npm init -y
// npm i express 
// npm i nodemon --save-dev
// create start script in paclage.json => "start" : "nodemon crud/adpi.js"'
// package.json dir => start

const express = require("express");
const app = express();
const userDB = require("./user.json");
const fs = require("fs");
const path = require("path");

// REST API 
// HTTP methods =>
// app.get("/api/users", function (req, res) {
//     console.log("Recieved req");
//     res.status(200).json({
//         status: "success recieved get request from client",
//     })
// })
// Rest API
// HTTP request
// http packets => body 
app.use(express.json());
// handler req. body

// 1) create => post
app.post("/api/users", function (req, res) {
    let user = req.body;
    // db save 
    console.log(user);
    // if a new entry is created on server
    // memory => ram 
    // save in DB
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    res.status(201).json({
        success: "successfull",
        user: user
    })
})
// 2)  read => GET

app.get("/api/users/:user_id", function (req, res) {

    let { user_id } = req.params;
    let user;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }

    res.status(200).json({
        status: "success",
        user: user != undefined ? user : "No user found"
    })
})

// 3) update  => PATCH
// client will send ur id in url and data to update in request body

app.patch("/api/users/:user_id", function (req, res) {

    let { user_id } = req.params;
    let user;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }
    // update

    res.status(200).json({
        status: "success",
        user: user != undefined ? user : "No user found"
    })
})

// 4) delete => DELETE
// search and delete => can use slice
app.delete("/api/users/:user_id", function (req, res) {

    let { user_id } = req.params;
    let user;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }

    res.status(200).json({
        status: "success",
        user: user != undefined ? user : "No user found"
    })
})
// localhost:3000/api/users 
app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})
