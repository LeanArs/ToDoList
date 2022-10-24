const User = require ('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const register = async (req, res) => {
    try {
        return res.render("register")
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        return res.render("login");
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const createUser = async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email }))
            res.status(400).send({ error: 'E-mail already exists' });
        
        const user = await User.create(req.body);

        user.password = undefined;
        
        return res.redirect("login");
    }
    catch (err) {
        res.status(400).send({ error: 'Registration failed' });
    }
};

const authenticate = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email}).select('+password')

    if (!user) {
        return res.status(400).send({ error: 'Email not found'})
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({ error: 'Invalid password'})
    }  

    user.password = undefined;

    const userId = user._id
    return res.redirect(`/tasks/${userId}`)
};

function generateToken (params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
};

module.exports = {
    register,
    createUser,
    login,
    authenticate,
};