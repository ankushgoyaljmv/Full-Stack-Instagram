// npm init -y
// npm i express 
// npm i nodemon --save-dev
// create start script in paclage.json => "start" : "nodemon crud/adpi.js"'
// package.json dir => start

const express = require("express");
const app = express();
let userDB = require("./user.json");
const fs = require("fs");
const path = require("path");

// GEneric
// HTTP methods =>
// app.Method("/api/users", function (req, res) {
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

//highest priority middle ware
app.use(function (req, res, next) {
    console.log(" I will always run");
    console.log(req.body);
    next();
})

//  Middleware => modify the resquest response cycle
app.post("/api.users", function (req, res, next) {
    console.log(" I m Middleware");
    console.log(req.body);
    let keys = Object.keys(req, body);
    if (keys.length == 0) {
        res.status(400).json({
            status: "failure",
            "message": "you should send some data to signup"
        })
    }
    else {
        next();
    }
})
// Sub ROuters
const userRouter = new express.Router();
const postRouter = new express.Router();

app.use("/api/users", userRouter);
app.use("/api/users", postRouter);

// User => Routes
// 1) create => post
userRouter.post("/", createUser)

// shortand => app.route
userRouter.route("/:user_id").get(getUser).patch(updateUser).delete(deleteUser);



// FOr Insta Post -> ROutes =================================================================
// 1) create => post
postRouter.post("/", createPost)

// 2, 3, 4 
// shortand => app.route
postRouter.route("/:post_id").get(getPost).patch(updatePost).delete(deletePost);





// Users Route Handlers ==========================================================
function createUser (req, res) {
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
}

// // 2)  read => GET
// app.get("/api/users/:user_id", getUser)

function getUser (req, res) {

    let { user_id } = req.params;
    let user;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }
    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    res.status(200).json({
        status: "success",
        user: user
    })
}

// // 3) update  => PATCH
// // client will send ur id in url and data to update in request body
// app.patch("/api/users/:user_id", updateUser)
function updateUser (req, res) {

    let { user_id } = req.params;
    let user;
    let toUpdate = req.body;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }
    // update

    for (let key in toUpdate) {
        user[key] = toUpdate[key];
    }

    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));

    res.status(200).json({
        status: "success",
        "message": "updated"
    })
}

// // 4) delete => DELETE
// // search and delete => can use slice
// app.delete("/api/users/:user_id", deleteUser)
function deleteUser (req, res) {

    let { user_id } = req.params;
    let user;
    let initialUserL = userDB.length;
    userDB = userDB.filter(function (user) {
        return user.user_id != user_id;
    })
    if (initialUserL == userDB.length) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    res.status(200).json({
        status: "success",
        user: "User Deleted"
    })
}

// Post route handlers ============================================================
function createPost (req, res) {
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
}

function getPost (req, res) {

    let { user_id } = req.params;
    let user;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }
    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    res.status(200).json({
        status: "success",
        user: user
    })
}

function updatePost (req, res) {

    let { user_id } = req.params;
    let user;
    let toUpdate = req.body;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }
    // update

    for (let key in toUpdate) {
        user[key] = toUpdate[key];
    }

    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));

    res.status(200).json({
        status: "success",
        "message": "updated"
    })
}

function deletePost (req, res) {

    let { user_id } = req.params;
    let user;
    let initialUserL = userDB.length;
    userDB = userDB.filter(function (user) {
        return user.user_id != user_id;
    })
    if (initialUserL == userDB.length) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    res.status(200).json({
        status: "success",
        user: "User Deleted"
    })
}

// localhost:3000/api/users 
app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})
