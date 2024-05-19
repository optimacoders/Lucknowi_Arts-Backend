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

const getAdminUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Usermodel.findById(id);
        if (!user || user.userType !== 'admin') {
            return res.status(404).json({ status: false, message: 'Admin user not found' });
        }
        return res.status(200).json({ status: true, data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

const editAdminUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, mobileNo } = req.body;

    try {
        const user = await Usermodel.findById(id);
        if (!user || user.userType !== 'admin') {
            return res.status(404).json({ status: false, message: 'Admin user not found' });
        }

        if (email) {
            const existingUser = await Usermodel.findOne({ email, userType: 'admin' });
            if (existingUser && existingUser._id.toString() !== id) {
                return res.status(400).json({ status: false, message: 'Email is already in use by another admin user' });
            }
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (mobileNo) user.mobileNo = mobileNo;

        await user.save();

        return res.status(200).json({ status: true, message: 'Admin user updated successfully', response: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

const deleteAdminUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Usermodel.findOne({ _id: id, userType: 'admin' });
        if (!user) {
            return res.status(404).json({ status: false, message: 'Admin user not found' });
        }

        await Usermodel.findByIdAndDelete(id);

        return res.status(200).json({ status: true, message: 'Admin user deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

module.exports = {
    addAdminUser,
    getAllAdminUsers,
    getAdminUserById,
    editAdminUser,
    deleteAdminUser
};
