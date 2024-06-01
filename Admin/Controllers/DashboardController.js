const orderModel = require("../../Models/OrderModel");
const productModel = require("../../Models/Productmodel");
const colorModel = require("../../Models/ColorsModel");
const sizeModel = require("../../Models/SizeModel");
const categoryModel = require("../../Models/CategoryModel");
const { response } = require("express");

const cardsData = async (req, res) => {
    try {
        const orderTotal = await orderModel.countDocuments({});

        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const ordersLastMonth = await orderModel.countDocuments({
            createdAt: { $gte: lastMonth }
        });

        const totalProducts = await productModel.countDocuments({});

        const totalCategories = await categoryModel.countDocuments({});

        const totalSizes = await sizeModel.countDocuments({});

        const totalColors = await colorModel.countDocuments({});

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
        const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));
        const ordersDueTomorrow = await orderModel.countDocuments({
            Delivery: { $gte: startOfTomorrow, $lte: endOfTomorrow }
        });

        res.status(200).json({
            status: true,
            response: {
                orderTotal,
                ordersLastMonth,
                totalProducts,
                totalCategories,
                totalSizes,
                totalColors,
                ordersDueTomorrow
            }
        });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const getOrdersLast7Days = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            last7Days.push(date);
        }

        const ordersCountPromises = last7Days.map(date => {
            const startOfDay = new Date(date.setHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setHours(23, 59, 59, 999));
            return orderModel.countDocuments({
                createdAt: { $gte: startOfDay, $lte: endOfDay }
            }).then(count => ({ date: startOfDay, count }));
        });

        const ordersCount = await Promise.all(ordersCountPromises);

        const data = ordersCount.map(({ date, count }) => ({
            year: date.toISOString().split('T')[0], // Format the date as 'YYYY-MM-DD'
            value: count
        }));

        res.status(200).json({ status: true, response: data });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

module.exports = { cardsData, getOrdersLast7Days };
