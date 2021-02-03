const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post('/signup', (req,res,next) => {
    console.log(req.body);
    User.find({email: req.body.email})
        .exec()
        .then(data => {
            console.log(data);
            if(data.length>0) {
                return res.status(409).json({
                    message: "Mail exists"
                  });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                      return res.status(500).json({
                        error: err
                      });
                    } else {
                      const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                      });
                      user
                        .save()
                        .then(result => {
                          console.log(result);
                          res.status(201).json({
                            message: "User created"
                          });
                        })
                        .catch(err => {
                          console.log(err);
                          res.status(500).json({
                            error: err
                          });
                        });
                    }
                  });
            }
        })
})

router.post('/login', (req,res,next) => {
    console.log(req.body);
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              name: user[0].name
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})

module.exports = router;