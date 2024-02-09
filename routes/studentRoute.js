import express from "express";
import { allStudents, getStudentByReg, logout, signIn, signup, updateStudentByReg } from "../controllers/studentController.js";
const router = express.Router();

router.route('/students/sign-up').post(signup)
router.route('/students/sign-in').post(signIn)
router.route('/students/logout').delete(logout)

router.route('/students/:reg').get(getStudentByReg)
router.route('/students/:reg').patch(updateStudentByReg)
router.route('/students').get(allStudents)

export default router