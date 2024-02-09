import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  Address,
  Contact,
  Department,
  Education,
  Hall,
  Personal,
  Student,
  User,
  Varsity,
} from "../models/models.js";

import {
  createAddress,
  createContact,
  createDepartment,
  createEducation,
  createHall,
  createPersonal,
  createStudent,
  createUser,
  createVarsity,
} from "../services/userService.js";

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
      bio: "",
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

    const department = await createDepartment({
      name: "",
      reg: "",
      roll: "",
      session: "",
      isRegular: "",
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
      reg: reg,
      personal: personal,
      address: address,
      contact: contact,
      education: education,
      varsity: varsity,
    });

    return res.status(201).json({
      message: "Congratulations! You are a member of DeptEase",
      student,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password ,reg} = req.body;
    // Validate input
    if (!email || !password || !reg) {
      return res.status(400).json({
        message: "Invalid credentials. Please provide correct information",
      });
    }
    // Check if the user exists
    const existingUser = await User.findOne({ email,reg });

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
      { email: existingUser.email,reg:existingUser.reg },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h", // Set your desired expiration time
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
  console.log('logout')
  try {
    // Clear the "my_token" cookie
    res.cookie("my_token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    // Send a success response
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const allStudents = async (req, res) => {
  try {
    const students = await Student.find({})
      .populate("personal")
      .populate("address")
      .populate("contact")
      .populate("education")
      .populate({
        path: "varsity",
        model: "Varsity",
        populate: [
          {
            path: "dept",
            model: "Department",
          },
          { path: "hall" },
        ],
      });

    if (!students) {
      return res.status(404).json({ message: "No student found" });
    }
    return res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getStudentByReg = async (req, res) => {
  const { reg } = req.params;
  try {
    const student = await Student.findOne({ reg })
      .populate("personal")
      .populate("address")
      .populate("contact")
      .populate("education")
      .populate({
        path: "varsity",
        model: "Varsity",
        populate: [
          {
            path: "dept",
            model: "Department",
          },
          { path: "hall" },
        ],
      }).exec()

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found with this reg:" + reg });
    }
    return res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateStudentByReg = async (req, res) => {
  const { reg } = req.params;
  try {
    const student = await Student.findOneAndUpdate({ reg })
      .populate("personal")
      .populate("address")
      .populate("contact")
      .populate("education")
      .populate({
        path: "varsity",
        model: "Varsity",
        populate: [
          {
            path: "dept",
            model: "Department",
          },
          { path: "hall" },
        ],
      });

    if (!student) {
      return res
        .status(404)
        .json({ message: "No student found with this reg:" + reg });
    }
    // Personal data updated
    if (req.body.personal) {
      await Personal.findOneAndUpdate(
        { _id: student.personal._id },
        req.body.personal
      );
    }
    // address data updated
    if (req.body.address) {
      await Address.findOneAndUpdate(
        { _id: student.address._id },
        req.body.address
      );
    }
    // contact data update
    if (req.body.contact) {
      await Contact.findOneAndUpdate(
        { _id: student.contact._id },
        req.body.contact
      );
    }
    // education data update
    if (req.body.education) {
      await Education.findOneAndUpdate(
        { _id: student.education._id },
        req.body.education
      );
    }
    // varsity data updated
    if (req.body.varsity) {
      await Varsity.findOneAndUpdate(
        { _id: student.varsity._id },
        req.body.varsity
      );
    }
    // department data update
    if (req.body.dept) {
      await Department.findOneAndUpdate(
        { _id: student.varsity.dept._id },
        req.body.dept
      );
    }

    // hall data update
    if (req.body.hall) {
      await Hall.findOneAndUpdate(
        { _id: student.varsity.hall._id },
        req.body.hall
      );
    }


    const updatedStudent = await Student.findOne({ reg })
    .populate("personal")
    .populate("address")
    .populate("contact")
    .populate("education")
    .populate({
      path: "varsity",
      model: "Varsity",
      populate: [
        {
          path: "dept",
          model: "Department",
        },
        { path: "hall" },
      ],
    });


    return res.status(200).json({
      message: "Student updated successfully",
      student:updatedStudent
    });
  } catch (error) {
    res.status(error.status).json({message:"something went wrong when update student data",error:error.message})
    console.error(error);
  }
  res.end();
};


// export const updateStudentByReg = async (req, res) => {
//   const { reg } = req.params;

//   try {
//     const student = await Student.findOne({ reg })
//       .populate("personal")
//       .populate("address")
//       .populate("contact")
//       .populate("education")
//       .populate({
//         path: "varsity",
//         model: "Varsity",
//         populate: [
//           {
//             path: "dept",
//             model: "Department",
//           },
//           { path: "hall" },
//         ],
//       });

//     if (!student) {
//       return res
//         .status(404)
//         .json({ message: "No student found with this reg:" + reg });
//     }

//     const updatePromises = [];

//     // Define update functions
//     const updateFunctions = {
//       personal: Personal.findOneAndUpdate,
//       address: Address.findOneAndUpdate,
//       contact: Contact.findOneAndUpdate,
//       education: Education.findOneAndUpdate,
//       varsity: Varsity.findOneAndUpdate,
//       dept: Department.findOneAndUpdate,
//       hall: Hall.findOneAndUpdate,
//     };

//     // Iterate over the keys in req.body
//     for (const key in req.body) {
//       if (updateFunctions[key]) {
//         updatePromises.push(
//           updateFunctions[key]({ _id: student[key]._id }, req.body[key])
//         );
//       }
//     }

//     // Execute all update promises in parallel
//     await Promise.all(updatePromises);

//     return res.status(200).json({
//       message: "Student updated successfully",
//       student,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };
