const User = require("../models/user-model");
const Property = require("../models/property-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        const { Propertyname, title, description, type, Category, subCategory, price, Selectprice } = req.body;
        console.log(req.body);

        const result = await Property.create({ Propertyname, title, description, type, Category, subCategory, price, Selectprice });
        res.status(200).json({ data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};







const register = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, address, mobile, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            console.log("email already exist");

            return res.status(400).json({ msg: "email already exist" });
        }


        const result = await User.create({ name, email, address, mobile, password });
        res.status(200).json({ data: result });
        res.status(201).json({ msg: register, token: await register.generateToken(), userId: register._id > toString(), });
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = "";

        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id.toString(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { home, register, login };

