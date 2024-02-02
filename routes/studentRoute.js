import express from "express";
import { signup,login,logout, allStudents, getStudentById, updateStudentDataById } from "../controllers/studentController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route('/students/signup').post(signup)
router.route('/students/signin').post(login)
router.route('/students/logout').get(logout)

router.route('/students/:id').get(getStudentById).patch(updateStudentDataById)
router.route('/students').get(auth, allStudents)

export default router