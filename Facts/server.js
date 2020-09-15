const express = require("express");
const app = express();

// Public folder that could be used by any client
app.use(express.static("public"));

// localhost:3000 => address 
app.listen(3000, function () {
    console.log("Server Started at port 3000");
})