const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownerModel');

// POST /create - only allowed in development
if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        try {
            let owners = await ownerModel.find();

            // Prevent creating more than one owner
            if (owners.length > 0) {
                req.flash('success', "You don't have permission to create a new owner.");
                return res.redirect('/admin');
            }

            const { fullname, email, password } = req.body;

            const createOwner = await ownerModel.create({
                fullname,
                email,
                password,
            });

            req.flash('success', 'Owner created successfully!');
            res.redirect('/admin');
        } catch (error) {
            console.error(error);
            req.flash('success', 'Server error while creating owner.');
            res.redirect('/admin');
        }
    });
}

// GET /admin - render form with flash message
router.get('/admin', (req, res) => {
    const success = req.flash('success'); // Retrieve flash message
    res.render('createproducts', { success }); // Pass to EJS
});

module.exports = router;
