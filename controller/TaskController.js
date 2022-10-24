const Task = require ('../models/Task') 

let message = "";
let type = "";

const getAllTasks = async (req, res) => {
    try {
        const userId = req.params.user;
        setTimeout(() => {
            message = ""
        }, 2000);
        const tasksList = await Task.find({userId});
        return res.render("index", {
            userId,
            tasksList,
            task: null,
            taskDelete: null,
            message,
            type,
        });
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const createTask = async (req, res) => {
    const task = req.body;
    const userId = req.params.user;

    if(!task.task){
        message = "insira um texto, antes de adicionar a tarefa"
        type = "danger"
        return res.redirect(`/tasks/${userId}`)
    }

    try {
        const taskModel = {
            task: task.task,
            userId
        }
        await Task.create(taskModel)
        message = "Tarefa criada com sucesso"
        type = "success"
        return res.redirect(`/tasks/${userId}`)
    }
    catch (err) {
        res.status(500).send({error: err.message})
    }
};

const getById = async (req, res) => {
    try{
        const userId = req.params.user;
        const tasksList = await Task.find({userId});
        if (req.params.method == "update"){
            const task = await Task.findOne({_id: req.params.id});
            res.render("index", { userId, task, taskDelete: null, tasksList, message, type })
        }
        else {
            const taskDelete = await Task.findOne({_id: req.params.id});
            res.render("index", { userId, task: null, taskDelete, tasksList, message, type })
        }
    }
    catch (err) {
        res.status(500).send({error: err.message})
    }
};

const updateOneTask = async (req, res) => {
    try {
        const userId = req.params.user;
        const task = req.body;
        await Task.updateOne({ _id: req.params.id }, task);
        message = "Tarefa atualizada com sucesso!"
        type = "success"
        res.redirect(`/tasks/${userId}`);
    }
    catch (err) {
        res.status(500).send({error: err.message})
    }
};

const deleteOneTask = async (req, res) => {
    try{
        const userId = req.params.user;
        await Task.deleteOne({ _id: req.params.id });
        message = "Tarefa apagada com sucesso!"
        type = "success"
        res.redirect(`/tasks/${userId}`);
    }
    catch (err) {
        res.status(500).send({error: err.message})
    }
}

const taskCheck = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });

        if (task.check){
            task.check = false;
        }
        else {
            task.check = true;
        }

        await Task.updateOne({ _id: req.params.id}, task)
        res.redirect("/tasks");
    }
    catch (err) {
        res.status(500).send({error: err.message})
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getById,
    updateOneTask,
    deleteOneTask,
    taskCheck,
};