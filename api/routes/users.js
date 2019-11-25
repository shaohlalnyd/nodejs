const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.get('/', (req, res, next) => {
    User.find().exec()
        .then(data => {
            res.status(200).json({
                data: data
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
})

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(
        data => {
            if (data.length > 1) {
                return res.status(404).json({
                    messga: "auth filed"
                })
            }
            else {
                console.log("aedwef")
                bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "auth field"
                        })
                    }
                    else {
                        console.log("first else")
                        if (result) {
                            console.log("in result")
                            const token=jwt.sign({
                                email:data[0].email,
                                user_id:data[0]._id
                            },"secret",
                            {expiresIn:"1h"})
                            res.status(200).json({
                                messaga: "auth successfull",
                                token:token
                            })
                        }
                        else {
                            res.status(401).json({
                                message:"password not compared"
                            })
                        }

                    }
                })
            }
        }
    ).catch(
        err => {
            res.status(500).json({
                message:err
            })
        }
    )
})

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then(data => {
            if (data.length >= 1) {
                res.status(409).json({
                    error: "این ایمیل در سامانه ثبت شده است"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        
                        res.status(500).json({
                            message: err
                        })
                    }
                    else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        })
                        user.save().then(data => {
                            res.status(200).json({
                                message: "user created",
                                data: data
                            })
                        }
                        ).catch(err => {
                            res.status(500).json({
                                error: err
                            })
                        })
                    }
                })
            }
        })
})
router.delete('/:userId', (req, res, next) => {
    let userId = req.params.userId
    User.deleteOne({ _id: userId }).exec()
        .then(data => {
            res.json({
                message: "user deleted"
            })
        })
        .catch(err => {
            res.json({
                message: err
            })
        })
})


module.exports = router