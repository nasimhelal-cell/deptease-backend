import express from "express";
import { signup,login,logout, allStudents, getStudentById, updateStudentDataById } from "../controllers/studentController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route('/students/sign-up').post(signup)
router.route('/students/sign-in').post(login)
router.route('/students/logout').get(logout)

router.route('/students/:reg').get(getStudentById).patch(updateStudentDataById)
router.route('/students').get(allStudents)

export default router