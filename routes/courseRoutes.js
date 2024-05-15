import express from "express";
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated ,authorizeSubcribers} from "../middlewares/Auth.js";

const router = express.Router();

// Get all courses without Lectures 
router.route("/courses").get(getAllCourses);

// Create new course - only admin 
router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// Add Lecture, Delete Course, Get Course details 
router.route("/course/:id").get(isAuthenticated, authorizeSubcribers, getCourseLectures).post(isAuthenticated, authorizeAdmin, singleUpload, addLecture).delete(isAuthenticated, authorizeAdmin, deleteCourse)

// Delete Lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;