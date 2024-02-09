import { model } from "mongoose";
import {
  addressSchema,
  contactSchema,
  departmentSchema,
  educationSchema,
  hallSchema,
  personalSchema,
  studentSchema,
  userSchema,
  varsitySchema
} from "../Schema/StudentSchema.js";

export const User = model("User", userSchema);
export const Personal = model("Personal", personalSchema);
export const Address = model("Address", addressSchema);
export const Contact = model("Contact", contactSchema);
export const Education = model("Education", educationSchema);

export const Department = model("Department", departmentSchema);
export const Hall = model("Hall", hallSchema);
export const Varsity = model("Varsity", varsitySchema);

export const Student = model("Student", studentSchema);
