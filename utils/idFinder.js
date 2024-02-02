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

export default async function idFinder(reg) {
  const user = await User.findOne({ reg });
  const student = await Student.findOne({ user: user._id });

  const personal = await Personal.findById(student.personal);
  const address = await Address.findById(student.address);
  const contact = await Contact.findById(student.contact);
  const education = await Education.findById(student.education);
  const skill = await Skill.findById(student.skill);
  const varsity = await Varsity.findById(student.varsity);

  const dept = await Department.findById(varsity.dept);
  const hall = await Hall.findById(varsity.hall);

  const course = await Course.findById(dept.course);

  const id = {
    user: user._id,
    student: student._id,
    personal: personal._id,
    address: address._id,
    contact: contact._id,
    education: education._id,
    skill: skill._id,
    varsity: varsity._id,
    dept: dept._id,
    hall: hall._id,
    course: course._id,
  };

  return id;
}
