const bcrypt = require('bcryptjs');
const Usermodel = require('../../Models/Usermodel');
const jwt = require('jsonwebtoken');

const addAdminUser = async (req, res) => {
    const { name, password, email, mobileNo } = req.body;

    try {
        const existingUser = await Usermodel.findOne({ email, userType: 'admin' });
        if (existingUser) {
            return res.status(400).json({ status: false, message: 'User with this email and userType admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Usermodel({
            name,
            password: hashedPassword,
            email,
            mobileNo,
            userType: 'admin'
        });

        await newUser.save();

        return res.status(201).json({ status: true, message: 'Admin user created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

const getAllAdminUsers = async (req, res) => {
    try {
        const adminUsers = await Usermodel.find({ userType: 'admin' });
        return res.status(200).json({ status: true, data: adminUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
};


module.exports = {
    addAdminUser, getAllAdminUsers
};
