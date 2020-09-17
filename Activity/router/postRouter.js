const postRouter = new express.Router();
const { } = require("../controllers/postController");
// FOr Insta Post -> ROutes =================================================================
// 1) create => post
postRouter.post("/", createPost)

// 2, 3, 4 
// shortand => app.route
postRouter.route("/:post_id").get(getPost).patch(updatePost).delete(deletePost);
module.exports = postRouter;
