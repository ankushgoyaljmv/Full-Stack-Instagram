const userRouter = new express.Router();
let {createUser, updateUser, deleteUser,getUser} = require("../controllers/userController");
// User => Routes
// 1) create => post
userRouter.post("/", createUser)

// shortand => app.route
userRouter.route("/:user_id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = userRouter;
