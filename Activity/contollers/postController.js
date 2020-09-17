const postDB = require("../model/post.json");

// Post route handlers ============================================================
function createPost (req, res) {
    let post = req.body;
    // db save 
    console.log(post);
    // if a new entry is created on server
    // memory => ram 
    // save in DB
    postDB.push(post);
    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDB));
    res.status(201).json({
        success: "successfull",
        post: post
    })
}

function getPost (req, res) {

    let { post_id } = req.params;
    let post;
    for (let i = 0; i < postDB.length; i++) {
        if (postDB[i].post_id == post_id) {
            post = postDB[i];
        }
    }
    if (post == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "post not found"
        })
    }

    res.status(200).json({
        status: "success",
        post: post
    })
}

function updatePost (req, res) {

    let { post_id } = req.params;
    let post;
    let toUpdate = req.body;
    for (let i = 0; i < postDB.length; i++) {
        if (postDB[i].post_id == post_id) {
            post = postDB[i];
        }
    }
    // update

    for (let key in toUpdate) {
        post[key] = toUpdate[key];
    }

    if (post == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "post not found"
        })
    }
    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDB));

    res.status(200).json({
        status: "success",
        "message": "updated"
    })
}

function deletePost (req, res) {

    let { post_id } = req.params;
    let post;
    let initialpostL = postDB.length;
    postDB = postDB.filter(function (post) {
        return post.post_id != post_id;
    })
    if (initialpostL == postDB.length) {
        return res.status(404).json({
            status: "failure",
            message: "post not found"
        })
    }

    res.status(200).json({
        status: "success",
        post: "post Deleted"
    })
}

module.exports.createPost = createPost;
module.exports.updatePost = updatePost;
module.exports.getPost = getPost;
module.exports.deletePost = deletePost;
