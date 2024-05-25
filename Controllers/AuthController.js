const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usermodel = require('../Models/Usermodel');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        // Input validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, address, mobileNo, email, password, userType } = req.body;

        // Check if the user already exists by email or mobile number
        let userByEmail = await Usermodel.findOne({ email });
        let userByMobile = await Usermodel.findOne({ mobileNo });

        if (userByEmail) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        if (userByMobile) {
            return res.status(400).json({ message: 'User with this mobile number already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const user = new Usermodel({
            name,
            address,
            mobileNo,
            email,
            password: hashedPassword,
            userType
        });

        await user.save();

        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };

        const jwtSecret = process.env.JWT_SECRET;

        jwt.sign(
            payload,
            jwtSecret,
            (err, token) => {
                if (err) {
                    console.error('Error generating JWT token:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                res.status(201).json({ status: true, message: 'User registered successfully', token });
            }
        );
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
      
        const email = req.body.email;
        const password = req.body.password;

        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        const jwtSecret = process.env.JWT_SECRET;
        jwt.sign(
            payload,
            jwtSecret,
            (err, token) => {
                if (err) {
                    console.error('Error generating JWT token:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                res.status(200).json({ status: true, message: 'User logged in successfully', token });
            }
        );
    } catch (error) {
        // if the password is wrong or the email does not exist then send an error msg to the user
        if (error.name === 'InvalidCredentialsError' || error.name === 'UserNotFoundError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const getuserDetails=async(req,res)=>{
try {
    const user = req.user;
    const userdetails=await Usermodel.findById(user.id)
    return res.status(200).send({
        status: true,
        message:"user details fetched succesfully",
        userdetails
    });
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    
}


}


const editUserDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const { data } = req.body;
        const { name, email, mobileNo, address } = data;

        const updatedUser = await Usermodel.findByIdAndUpdate(userId, {
            name: name,
            email: email, 
            mobileNo: mobileNo,
            address: address
        }, { new: true });

        if (updatedUser) {
            return res.status(200).send({
                status: true,
                message: "User details updated successfully",
                updatedUser
            });
        } else {
            return res.status(404).send({
                status: false,
                message: "User not found or details not updated"
            });
        }
    } catch (error) {
        console.error('Error editing user details:', error);
        return res.status(500).send({
            status: false,
            message: "Internal server error"
        });
    }
};




module.exports = { signup, login ,getuserDetails,editUserDetails};
