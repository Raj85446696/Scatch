const express = require('express');
const router = express.Router(); 
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/',(req,res)=>{
    let error = req.flash('error');
    res.render('index',{error});
});

router.get('/shop',isLoggedIn,(req,res)=>{
    res.render('shop');
});

router.get('/addtocart/:id',isLoggedIn,async(req,res)=>{
    const user = await userModel.findOne({user:req.user.email});
})


module.exports = router ;