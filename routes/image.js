const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const mongoose = require("mongoose");
const jwt_decode = require("jwt-decode");

router.get('/get', (req,res,next) => {
    const decoded = jwt_decode(req.headers.authorization.split(' ')[1]);
    const userId = decoded.userId;
    const email = decoded.email;
    Image.find({userId: new mongoose.Types.ObjectId(userId)})
        .exec()
        .then(data => {
            console.log(data);
            if(data.length >= 1) {
                res.status(201).json({
                    message: "Data fetched",
                    displayData: [...data[0].imageArray]
                });
            } else {
                res.status(201).json({
                    message: "No data found",
                    displayData: []
                });
            }
        })
})

router.post('/upload', (req,res,next) => {
    console.log(req.body);
    console.log(req.headers);
    const decoded = jwt_decode(req.headers.authorization.split(' ')[1]);
    const userId = decoded.userId;
    const email = decoded.email;
    Image.find({userId: new mongoose.Types.ObjectId(userId)})
        .exec()
        .then(data => {
            console.log(data);
            if(data.length >= 1) {
                const imgObj = {
                    image: req.body.img,
                    imagename: req.body.name,
                    imagedate: req.body.date
                };
                const imageArray = [...data[0].imageArray];
                imageArray.push(imgObj);
                Image.updateOne({userId: new mongoose.Types.ObjectId(userId)},{imageArray: [...imageArray]})
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                        message: "Image uploaded"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                        error: err
                        });
                    });
            } else {
                const imgObj = {
                    image: req.body.img,
                    imagename: req.body.name,
                    imagedate: req.body.date
                };
                const imageArray = [];
                imageArray.push(imgObj);
                const img = new Image({
                    _id: new mongoose.Types.ObjectId(),
                    userId: userId,
                    email: email,
                    imageArray: [...imageArray]
                });
                img.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                        message: "Image uploaded"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                        error: err
                        });
                    });
            }
        })
})

module.exports = router;