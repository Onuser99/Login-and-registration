const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(this.password, salt);

        this.password = hashedPassword;

        return next();
    } catch (error) {
        return next(error);
    }
});


userSchema.methods.generateToken = async function () {
    try {

        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },

            process.env.JWT_SECRETE_KEY,{
                expiresIn:"30d",
            }
        );
    }
    catch (error) {

    }
};


const User = mongoose.model("User", userSchema);
module.exports = User;
