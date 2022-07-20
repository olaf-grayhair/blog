// const mongoose = require('mongoose');
require('dotenv').config()
const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res) {
        try {
            const {email, password, firstName, surName} = req.body

            const candidate = await User.findOne({email})
            if(candidate) {
                return res.json({message: 'user already exists'})
            }

            ///HASH PASSWORD
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            
            const userRole = await Role.findOne({value: "USER"})
            console.log(userRole);
            const user = await User.create({
                email, 
                password: hash, 
                roles: [userRole.value], 
                firstName, 
                surName
            })

            return res.json({user})

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'fail in register'})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body

            //CHECK EMAIL
            const user = await User.findOne({email})
            if(!user) {
                return res.status(400).json({message: `user ${email} is not found!`})
            }

            //CHECK PASSWORD
            const hashPassword = bcrypt.compareSync(password, user.password)
            if(!hashPassword) {
                return res.status(400).json({message: `wrong password!`})
            }

            const token = generateJwt( user._id, user.email, user.roles);

            return res.json({user, token})
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'erro in login'})
        }
    }

    async authentication(req, res) {
        try {
            const user = await User.findOne({_id: req.user.id})
            console.log(user._id, 'IDD');
            const token = generateJwt( user._id, user.email, user.role);
            res.json({token, user, message: 'AUTH!'})
        } catch (error) {
            console.log(error);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            const usersLength = await User.countDocuments()
            console.log(usersLength, 'usersLength');
            res.json({users, usersLength})
        } catch (error) {
            console.log(error);
        }
    }

    async avatar(req, res) {
        try {
            let url = ''
            if(req.file === undefined) {
                url = ''
            } else {
                url = `/uploads/${req.file.originalname}`
            }
            
            const file = {
                firstName: req.body.firstName,
                surName: req.body.surName,
                avatarUrl: url,
            }

            const user = await User.findOneAndUpdate({_id:req.user.id}, file, { new: true })

            res.json(user)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserController()