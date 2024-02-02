import bcrypt from "bcrypt";
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

export const createUser = async ({
  firstName,
  lastName,
  reg,
  email,
  password,
}) => {
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);

  const user = new User({
    firstName,
    lastName,
    reg,
    email,
    password,
  });

  return await user.save();
};

export const createPersonal = async ({
  fullName,
  fatherName,
  motherName,
  guardianName,
  nationality,
  nid,
  dateOfBirth,
  religion,
  race,
  signature,
  gender,
  age,
  img,
}) => {
  const personal = new Personal({
    fullName,
    fatherName,
    motherName,
    guardianName,
    nationality,
    nid,
    dateOfBirth,
    religion,
    race,
    signature,
    gender,
    age,
    img,
  });

  return await personal.save();
};

export const createAddress = async ({
  type,
  houseNo,
  village,
  post,
  postCode,
  thana,
  district,
}) => {
  const address = new Address({
    type,
    houseNo,
    village,
    post,
    postCode,
    thana,
    district,
  });

  return await address.save();
};

export const createContact = async ({ phone, facebook, email }) => {
  const contact = new Contact({
    phone,
    facebook,
    email,
  });

  return await contact.save();
};

export const createEducation = async ({
  degree,
  board,
  passingYear,
  roll,
  gpa,
}) => {
  const education = new Education({
    degree,
    board,
    passingYear,
    roll,
    gpa,
  });

  return await education.save();
};

export const createSkill = async ({ name, description, certificate }) => {
  const skill = new Skill({
    name,
    description,
    certificate,
  });

  return await skill.save();
};

export const createCourse = async ({ name, code }) => {
  const course = new Course({
    name,
    code,
  });

  return await course.save();
};

export const createDepartment = async ({
  name,
  reg,
  roll,
  session,
  isRegular,
  course,
}) => {
  const department = new Department({
    name,
    reg,
    roll,
    session,
    isRegular,
    course,
  });

  return await department.save();
};

export const createHall = async ({ name, isResidential }) => {
  const hall = new Hall({
    name,
    isResidential,
  });

  return await hall.save();
};

export const createVarsity = async ({ name, location, dept, hall }) => {
  const varsity = new Varsity({
    name,
    location,
    dept,
    hall,
  });

  return await varsity.save();
};

export const createStudent = async ({
  user,
  personal,
  address,
  contact,
  education,
  varsity,
  skill,
}) => {
  const student = new Student({
    user,
    personal,
    address,
    contact,
    education,
    varsity,
    skill,
  });
  return await student.save();
};
