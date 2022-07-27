const jwt = require('jsonwebtoken')
require('dotenv').config()
const Post = require('../models/Post');
const User = require('../models/User');

module.exports = function (req, res, next) {
    // console.log('new_path', req.method);
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // 

        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        console.log(token);

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};