import { model } from "mongoose";
import {
  addressSchema,
  contactSchema,
  courseSchema,
  departmentSchema,
  educationSchema,
  hallSchema,
  personalSchema,
  skillSchema,
  studentSchema,
  userSchema,
  varsitySchema,
} from "../Schema/StudentSchema.js";

export const User = model("User", userSchema);
export const Personal = model("Personal", personalSchema);
export const Address = model("Address", addressSchema);
export const Contact = model("Contact", contactSchema);
export const Education = model("Education", educationSchema);
export const Course = model("Course", courseSchema);
export const Department = model("Department", departmentSchema);
export const Hall = model("Hall", hallSchema);
export const Varsity = model("Varsity", varsitySchema);
export const Skill = model("Skill", skillSchema);
export const Student = model("Student", studentSchema);
