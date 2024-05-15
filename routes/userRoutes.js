import express from "express";
import {
    register,
    login,
    logout,
    getMyProfile,
    changePassword,
    updateProfile,
    updateProfilePicture,
    forgetPassword,
    resetPassword,
    addToPlaylist,
    removeFromPlaylist,
    getAllUsers,
    updateUserRole,
    deleteUser,
    deleteMyProfile
} from "../controllers/userController.js";
import { isAuthenticated, authorizeAdmin } from "../middlewares/Auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// To register a new user 
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// Get my profile 
router.route("/me").get(isAuthenticated, getMyProfile);

// Delete My profile 
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// ChangePassword 
router.route("/changepassword").put(isAuthenticated, changePassword);

// UpdateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// UpdateProfilePicture
router.route("/updateprofilepicture").put(isAuthenticated, singleUpload, updateProfilePicture);

// FrogetPassword
router.route("/forgetpassword").post(forgetPassword);

// ResetPassword
router.route("/resetpassword/:token").put(resetPassword);

// AddToPlaylist 
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// RemoveFromPlaylist 
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router.route("/admin/user/:id").put(isAuthenticated, authorizeAdmin, updateUserRole).delete(isAuthenticated, authorizeAdmin, deleteUser)





export default router;