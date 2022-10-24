const routes = require("express").Router();
const TaskController = require("../controller/TaskController")
const AuthController = require("../controller/AuthController");
const UserController = require("../controller/UserController");
const AuthMiddleware = require("../middlewares/auth");

const { Router } = require("express");



// Auth
routes.get("/login", AuthController.login)
routes.post("/authenticate", AuthController.authenticate)
routes.get("/register", AuthController.register)
routes.post("/createUser", AuthController.createUser)


// Tasks
routes.get("/tasks/:user", TaskController.getAllTasks)
routes.post("/create/:user", TaskController.createTask)
routes.get("/getById/:id/:method/:user", TaskController.getById)
routes.post("/updateOne/:id/:user", TaskController.updateOneTask)
routes.get("/deleteOne/:id/:user", TaskController.deleteOneTask)
routes.get("/check/:id/:user", TaskController.taskCheck)

// Middleware
// routes.use(AuthMiddleware);


module.exports = routes