const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');
module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;
        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).send("You already have a Account , Please Login");

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });
                    let token = generateToken(user);
                    res.cookie('token', token);
                    res.send('user cretead successfully !');
                }
            })
        })
    } catch (err) {
        console.log(err.message);
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (!user) return res.send('Email or Password is incorrect');

        const result = await bcrypt.compare(password, user.password);
        if (!result) return res.send('Email or Password is incorrect');

        let token = generateToken(user);
        res.cookie('token', token);

        const products = await productModel.find();

        if (!products) return res.send('No products found');

        res.render('shop', { products,isLoggedIn:true }); 
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Server error');
    }
};


module.exports.logoutUser = async (req, res) => {
    res.cookie('token', '');
    res.redirect('/');
}