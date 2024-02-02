import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  Address,
  Contact,
  Course,
  Department,
  Education,
  Hall,
  Personal,
  Skill,
  Student,
  User,
  Varsity,
} from "../models/models.js";

import {
  createUser,
  createStudent,
  createPersonal,
  createAddress,
  createContact,
  createEducation,
  createVarsity,
  createSkill,
  createCourse,
  createDepartment,
  createHall,
} from "../services/userService.js";
import idFinder from "../utils/IdFinder.js";

export const signup = async (req, res) => {
  const { firstName, lastName, reg, email, password } = req.body;

  if (!firstName || !lastName || !reg || !email || !password) {
    return res.status(400).json({
      message: "Invalid credentials. Please provide correct information",
    });
  }

  try {
    const exitingUser = await User.findOne({ email, reg });

    if (exitingUser) {
      return res
        .status(400)
        .json({ message: "User Already exist, try with new email & reg no." });
    }
    // Create user
    const user = await createUser({
      firstName,
      lastName,
      reg,
      email,
      password,
    });
    // Create other documents
    const personal = await createPersonal({
      fullName: user.firstName + " " + user.lastName,
      fatherName: "",
      motherName: "",
      guardianName: "",
      nationality: "",
      nid: "",
      dateOfBirth: "",
      religion: "",
      race: "",
      signature: "",
      gender: "",
      age: "",
      img: "",
    });

    const address = await createAddress({
      type: "",
      houseNo: "",
      village: "",
      post: "",
      postCode: "",
      thana: "",
      district: "",
    });

    const contact = await createContact({
      phone: "",
      facebook: "",
      email: user.email,
    });

    const education = await createEducation({
      degree: "",
      board: "",
      passingYear: "",
      roll: "",
      gpa: "",
    });

    const skill = await createSkill({
      name: "",
      description: "",
      certificate: "",
    });

    const course = await createCourse({
      name: "",
      code: "",
    });

    const department = await createDepartment({
      name: "",
      reg: "",
      roll: "",
      session: "",
      isRegular: "",
      course: course._id,
    });

    const hall = await createHall({
      name: "",
      isResidential: false,
    });

    const varsity = await createVarsity({
      name: "",
      location: "",
      dept: department._id,
      hall: hall._id,
    });

    // Create student with references to other documents
    const student = await createStudent({
      user: user,
      personal: personal,
      address: address,
      contact: contact,
      education: education,
      varsity: varsity,
      skill: skill,
    });

    // Populate the student document with details from other collections
    // const studentWithDetails = await Student.findById(student._id).populate(
    //   "user personal address contact education varsity skill"
    // );

    return res.status(201).json({
      message: "Congratulations! You are a member of DeptEase",
      student,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid credentials. Please provide correct information",
      });
    }
    // Check if the user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not found. Sign up first." });
    }
    // Verify the password
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Create a JWT token
    const token = jwt.sign(
      { email: existingUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Set your desired expiration time
      }
    );

    res.cookie("my_token", token, { httpOnly: true });

    res.status(200).json({ message: "Login successful", existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  // Clear the authentication cookie
  res.cookie("my_token", "", {
    httpOnly: true,
    expires: new Date(0), // Expire the cookie immediately
  });
  res.end();
  // Redirect or respond as needed
  // res.redirect('/api/v1/students/signin'); // Redirect to login page after logout, adjust the URL as needed
};

export const allStudents = async (req, res) => {
  const students = await Student.find({});

  return res.status(200).json({ students });
};

export const getStudentById = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findOne({ _id: id });
  const personal = await Personal.findById(student.personal);
  const address = await Address.findById(student.address);
  const contact = await Contact.findById(student.contact);
  const education = await Education.findById(student.education);
  const skill = await Skill.findById(student.skill);
  const varsity = await Varsity.findById(student.varsity);
  const dept = await Department.findById(varsity.dept);
  const hall = await Hall.findById(varsity.hall);
  const course = await Course.findById(dept.course);

  return res.status(200).json({
    personal,
    address,
    contact,
    education,
    skill,
    varsity,
    dept,
    hall,
    course,
  });
};

export const updateStudentDataById = async (req, res) => {
  const { id } = req.params;
  const { personal, contact } = req.body;

  const student = await Student.findOne({ _id: id });
  const personalData = await Personal.findByIdAndUpdate(
    student.personal,
    personal
  );
  // const address= await Address.findById(student.address)
  const contactData = await Contact.findByIdAndUpdate(student.contact, contact);
  // const education= await Education.findById(student.education)
  // const skill= await Skill.findById(student.skill)
  // const varsity= await Varsity.findById(student.varsity)

  // const dept= await Department.findById(varsity.dept)
  // const hall= await Hall.findById(varsity.hall)

  // const course= await Course.findById(dept.course)

  res
    .status(200)
    .json({ message: personalData.fullName + `'s details updated` });
};

export const studentWithDetails = async (req, res) => {
  const student = await Student.findById(student._id).populate();
};
