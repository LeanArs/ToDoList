const Task = require ('../models/User');

const getAllUsers = async (req,res) => {
    try {
        const user = await User.find();
        return res.send({user})
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

const deleteUser = async (req,res) => {
    try {
        id = req.params
        const response = await User.deleteOne({id: id})
        return res.send({response})
    } catch (error) {
        return res.send({error: error})
    }
}

module.exports = {
    getAllUsers,
    deleteUser
}