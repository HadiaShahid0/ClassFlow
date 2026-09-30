import Class from "../models/classModel.js";
import User from "../models/user.js";
const createClassService = async (
  organizationId,
  name,
  description,
  teacherId
) => {
  // If teacher is provided, make sure the teacher
  // belongs to this organization.
  if (teacherId) {
    const teacher = await User.findOne({
      where: {
        id: teacherId,
        role: "teacher",
      },
      include: [
        {
          association: "teacherProfile",
          where: {
            organizationId,
          },
        },
      ],
    });

    if (!teacher) {
      throw new Error(
        "Teacher not found or teacher does not belong to your organization."
      );
    }
  }

  const newClass = await Class.create({
    name,
    description,
    organizationId,
    teacherId: teacherId || null,
  });

  return {
    message: "Class created successfully.",
    class: newClass,
  };
};

const getClassesService = async (organizationId) => {
  const classes = await Class.findAll({
    where: {
      organizationId,
    },
    include: [
      {
        model: User,
        as: "teacher",
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return classes;
};

const getClassByIdService = async (organizationId, classId) => {
  const classData = await Class.findOne({
    where: {
      id: classId,
      organizationId,
    },
    include: [
      {
        model: User,
        as: "teacher",
        attributes: ["id", "name", "email"],
      },
    ],
  });

  if (!classData) {
    throw new Error("Class not found.");
  }

  return classData;
};

const updateClassService = async (
  organizationId,
  classId,
  name,
  description
) => {
  const classData = await Class.findOne({
    where: {
      id: classId,
      organizationId,
    },
  });

  if (!classData) {
    throw new Error("Class not found.");
  }

  if (name !== undefined) {
    classData.name = name;
  }

  if (description !== undefined) {
    classData.description = description;
  }

  await classData.save();

  return {
    message: "Class updated successfully.",
    class: classData,
  };
};

const assignTeacherService = async (
  organizationId,
  classId,
  teacherId
) => {
  const classData = await Class.findOne({
    where: {
      id: classId,
      organizationId,
    },
  });

  if (!classData) {
    throw new Error("Class not found.");
  }

  const teacher = await User.findOne({
    where: {
      id: teacherId,
      role: "teacher",
    },
    include: [
      {
        association: "teacherProfile",
        where: {
          organizationId,
        },
      },
    ],
  });

  if (!teacher) {
    throw new Error(
      "Teacher not found or teacher does not belong to your organization."
    );
  }

  classData.teacherId = teacherId;

  await classData.save();

  return {
    message: "Teacher assigned to class successfully.",
    class: classData,
  };
};

const deleteClassService = async (organizationId, classId) => {
  const classData = await Class.findOne({
    where: {
      id: classId,
      organizationId,
    },
  });

  if (!classData) {
    throw new Error("Class not found.");
  }

  await classData.destroy();

  return {
    message: "Class deleted successfully.",
  };
};

export {
  createClassService,
  getClassesService,
  getClassByIdService,
  updateClassService,
  assignTeacherService,
  deleteClassService,
};