let userDB = require("../model/user.json");

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

module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;