import bcrypt from "bcryptjs";

import User from "../models/user.js";
import StudentProfile from "../models/studentProfile.js";
import Class from "../models/classModel.js";

export const createStudentService = async (
  teacherId,
  name,
  email,
  password,
  classId,
  rollNumber,
  phone,
) => {
  // Check class belongs to this teacher
  const classData = await Class.findOne({
    where: {
      id: classId,
      teacherId,
    },
  });

  if (!classData) {
    throw new Error("Class not found or this class is not assigned to you.");
  }

  // Check email
  const existingUser = await User.findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const student = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "student",
    isVerified: true,
  });

  await StudentProfile.create({
    userId: student.id,
    teacherId,
    classId,
    rollNumber,
    phone,
  });

  return {
    message: "Student created successfully.",
    student: {
      id: student.id,
      name: student.name,
      email: student.email,
      role: student.role,
      classId,
      rollNumber,
      phone,
    },
  };
};
export const getStudentsService = async (teacherId) => {
  const students = await StudentProfile.findAll({
    where: {
      teacherId,
    },

    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email", "role"],
      },
      {
        model: Class,
        as: "class",
        attributes: ["id", "name"],
      },
    ],

    order: [["createdAt", "DESC"]],
  });

  return students;
};
export const getStudentByIdService = async (teacherId, studentId) => {
  const student = await StudentProfile.findOne({
    where: {
      userId: studentId,
      teacherId,
    },

    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email", "role"],
      },
      {
        model: Class,
        as: "class",
        attributes: ["id", "name"],
      },
    ],
  });

  if (!student) {
    throw new Error("Student not found.");
  }

  return student;
};
export const updateStudentService = async (
  teacherId,
  studentId,
  name,
  rollNumber,
  phone,
  classId,
) => {
  const studentProfile = await StudentProfile.findOne({
    where: {
      userId: studentId,
      teacherId,
    },
  });

  if (!studentProfile) {
    throw new Error("Student not found.");
  }

  if (classId !== undefined) {
    const classData = await Class.findOne({
      where: {
        id: classId,
        teacherId,
      },
    });

    if (!classData) {
      throw new Error("Class not found or this class is not assigned to you.");
    }

    studentProfile.classId = classId;
  }

  const student = await User.findByPk(studentId);

  if (!student) {
    throw new Error("User not found.");
  }

  if (name !== undefined) {
    student.name = name;
  }

  if (rollNumber !== undefined) {
    studentProfile.rollNumber = rollNumber;
  }

  if (phone !== undefined) {
    studentProfile.phone = phone;
  }

  await student.save();
  await studentProfile.save();

  return {
    message: "Student updated successfully.",
  };
};

export const deleteStudentService = async (teacherId, studentId) => {
  const studentProfile = await StudentProfile.findOne({
    where: {
      userId: studentId,
      teacherId,
    },
  });

  if (!studentProfile) {
    throw new Error("Student not found.");
  }

  const student = await User.findByPk(studentId);

  await studentProfile.destroy();

  if (student) {
    await student.destroy();
  }

  return {
    message: "Student deleted successfully.",
  };
};
