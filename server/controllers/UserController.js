// const mongoose = require('mongoose');
require('dotenv').config()
const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs')
const sharp = require('sharp');
const uuid = require('uuid');


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
                return res.status(400).json({message: `user ${email} is already exists`})
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

            const token = generateJwt( user._id, user.email, user.roles);

            return res.json({user, token, message: `${email} was register!`})

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
                return res.status(400).json({message: `password is not found!`})
            }

            const token = generateJwt( user._id, user.email, user.roles);

            return res.json({user, token, message:'login was successful'})
        } catch (error) {
            console.log('error');
            return res.status(400).json({message: 'error in login'})
        }
    }

    async authentication(req, res) {
        try {
            const user = await User.findOne({_id: req.user.id})
            console.log(user._id, 'IDD');
            const token = generateJwt( user._id, user.email, user.role);
            res.json({token, user, message: 'auth was successful'})
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: 'error in auth'})
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

    async update(req, res) {
        try {
            // console.log(req.body, 'userchange');
            const file = {
                ...req.body
            }

            const user = await User.findOneAndUpdate({_id:req.user.id}, file, { new: true })

            res.json({user: user})
        } catch (error) {
            console.log(error);
        }
    }
    
    async uploadAvatar(req, res) {
        try {
            const user = await User.findById({_id: req.user.id})

            //SHARP
            const index = req.file.filename.lastIndexOf('.');
            const format = req.file.filename.slice(index + 1)
            const imgName = uuid.v4() + '.' + format

            const url = `${process.env.SERVER_URL}uploads/${imgName}`
            try {
                await sharp(req.file.path)
                .resize({with:80, height:80})
                .toFormat(`jpeg`, { mozjpeg: true }) 
                .toFile(`./uploads/${imgName}`); 
                fs.unlinkSync(req.file.path)
            } catch (error) {
                console.log(error);
            }
            //SHARP compress img

            if(user.avatarUrl !== '') {
                let img = user.avatarUrl.split(process.env.SERVER_URL)[1]

                console.log(img, 'userUpload', req.file.path);
                try {
                    fs.unlinkSync(img)
                    console.log("Successfully deleted file.")
                  } catch(err) {
                    await User.findOneAndUpdate({_id: req.user.id}, {avatarUrl: ""})
                    console.log(err);
                    throw err
                  }
            }

            console.log('end', url);
            res.json(url)
        } catch (error) {
            res.status(500).json({
                message: 'Не удалось загрузить изображение',
            });
        }
    }
}

module.exports = new UserController()