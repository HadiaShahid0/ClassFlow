import bcrypt from "bcryptjs";
import User from "../models/user.js";
import TeacherProfile from "../models/teacherProfile.js";

export const createTeacherService = async (
  organizationId,
  name,
  email,
  password,
  qualification,
  subject,
  phone
) => {
  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const teacher = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "teacher",
    isVerified: true,
  });

  await TeacherProfile.create({
    userId: teacher.id,
    organizationId,
    qualification,
    subject,
    phone,
  });

  return {
    message: "Teacher created successfully.",
    teacher: {
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      role: teacher.role,
      qualification,
      subject,
      phone,
    },
  };
};

export const getTeachersService = async (organizationId) => {
  const teachers = await TeacherProfile.findAll({
    where: {
      organizationId,
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email", "role"],
      },
    ],
  });

  return teachers;
};

