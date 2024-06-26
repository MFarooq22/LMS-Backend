import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";


export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return next(new errorHandler("Not Logged In", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    next()
};



export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(
            new errorHandler(`${req.user.role} is not allowed to access the resource`, 403)
        );
    };

    next();
}



export const authorizeSubcribers = (req, res, next) => {
    if (req.user.subscription.status !== "active" && req.user.role !== "admin") {
        return next(
            new errorHandler(`Only subscribers can access this resource`, 403)
        );
    };

    next();
}