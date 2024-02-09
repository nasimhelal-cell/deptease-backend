import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  reg: { type: String, required: true, unique: true }, // Added unique constraint
  email: { type: String, required: true, unique: true }, // Added unique constraint
  password: { type: String, required: true },
});

export const personalSchema = new mongoose.Schema({
  fullName: String,
  fatherName: String,
  motherName: String,
  guardianName: String,
  nationality: String,
  nid: String,
  dateOfBirth: String,
  religion: String,
  race: String,
  signature: String,
  bio: String,
  gender: String,
  age: Number,
  img: String,
});

export const addressSchema = new mongoose.Schema({
  type: String,
  houseNo: String,
  village: String,
  post: String,
  postCode: String,
  thana: String,
  district: String,
});

export const contactSchema = new mongoose.Schema({
  phone: String,
  facebook: String,
  email: { type: String, unique: true }, // Added unique constraint
});

export const educationSchema = new mongoose.Schema({
  degree: String,
  board: String,
  passingYear: String,
  roll: String,
  gpa: Number,
});


export const departmentSchema = new mongoose.Schema({
  name: String,
  reg: String,
  roll: String,
  session: String,
  isRegular: String,  
});

export const hallSchema = new mongoose.Schema({
  name: String,
  isResidential: { type: Boolean },
});

export const varsitySchema = new mongoose.Schema({
  name: String,
  location: String,
  dept: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  hall: { type: mongoose.Schema.Types.ObjectId, ref: "Hall" },
});



export const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reg: { type: String, unique: true }, // Added unique constraint
  personal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personal",
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
  education: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Education",
  },
  varsity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Varsity",
  },
  
}, { timestamps: true }); // Moved timestamps within the schema definition

