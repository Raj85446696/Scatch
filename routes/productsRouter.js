const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');
const upload = require('../config/multer-config');

router.get('/shop', async (req, res) => {
    try {
        const products = await productModel.find();
        res.render('shop', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/create', upload.single('image'), async (req, res) => {
    try{
        let { name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    } = req.body;
    const product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    });
    req.flash('success',"product create successfully");
    res.redirect('/owners/admin');
    } catch(err){
        res.send(err.message);
    }
    
})

module.exports = router;
