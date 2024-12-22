const express = require('express');
const router = express.Router();
const users = require('../model/userSchema');

// Create routes for the API
router.post('/register', async (req, res) => {

    // for check on postman...
    // console.log(req.body);
    // res.status(200).send('User registered successfully!');

    const { name, email, age, mobile, work, address, desc } = req.body;

    if (!name || !email || !age || !mobile || !work || !address || !desc) {
        return res.status(422).json("Please provide field details...");
    }

    try {

        const userExist = await users.findOne({ email: email, mobile: mobile });
        console.log(userExist);
        if (userExist) {
            return res.status(409).json('User already exist with same mobile or email');
        }
        else {
            const addUser = new users({
                name: name, email: email, age: age, mobile: mobile, work: work, address: address, desc: desc
            });

            await addUser.save(); //save in database
            res.status(201).json(addUser); //show on postman
            console.log(addUser); // show in terminal
        }

    } catch (err) {
        res.status(500).json("Server OR DB error" + err);
    }
});

// Get User Data

router.get('/getdata', async (req, res) => {
    try {
        const userdata = await users.find();
        res.status(201).json(userdata);
        console.log(userdata);
    } catch (err) {
        res.status(422).json(`use data not found ${err}`);
    }
})

// Get Individual User

router.get('/getuser/:id', async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const individualUser = await users.findById({ _id: id });
        console.log(individualUser);
        res.status(201).json(individualUser)
    } catch (err) {
        console.error("Error occured in individual user");
        res.status(422).json(err);
    }
})

// Update User

//put => update all statement
//patch => update only they statement which are change

router.patch('/updateuser/:id', async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const updateUser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });
        console.log(updateUser);
        res.status(201).json(updateUser);
    }
    catch (err) {
        console.error("Error occured in update user");
        res.status(422).json(err);
    }
})

// Delete User

router.delete('/deleteuser/:id', async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        // Delete the user by ID
        const deleteUser = await users.findByIdAndDelete(id);

        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Deleted User:", deleteUser);
        res.status(200).json({ message: "User deleted successfully", deletedUser: deleteUser });
    } catch (err) {
        console.error("Error occurred while deleting user:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});


module.exports = router; // Export the router
