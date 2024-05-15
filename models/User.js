import mongoose from "mongoose"
import validator from "validator"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: validator.isEmail,
    },

    password: {
        type: String,
        minLength: [6, "Password must be at least 6 characters"],
        required: [true, "Please enter your password"],
        select: false,
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },

    subscription: {
        id: String,
        status: String
    },

    avatar: {
        public_id: {
            type: String,
            required: true
        },

        url: {
            type: String,
            required: true
        }
    },

    playlist: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            },

            poster: String
        }
    ],

    createAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: String,
});

// hashing password before saving in db 
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    user.password = await bcrypt.hash(user.password, 10)
    next();
});

// compare the password 
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// create jwt token 
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });
};

// Reset password token 
userSchema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

export const User = mongoose.model("User", userSchema);