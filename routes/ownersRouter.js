const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownerModel');

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        try {
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.status(503).send("You don't have permission to create a new owner.");
            }

            let { fullname, email, password } = req.body;
            let createOwner = await ownerModel.create({
                fullname,
                email,
                password,
            });

            res.status(201).send(createOwner);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error.");
        }
    });
}


router.get('/', (req, res) => {
    res.send('owner router ');
})


module.exports = router; 