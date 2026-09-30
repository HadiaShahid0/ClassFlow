import {
  createTeacherService,
  getTeachersService,
} from "../../services/organizationServices.js";

const createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      qualification,
      subject,
      phone,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    const result = await createTeacherService(
      req.user.id,
      name,
      email,
      password,
      qualification,
      subject,
      phone
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await getTeachersService(req.user.id);

    return res.status(200).json({
      teachers,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export {
  createTeacher,
  getTeachers,
};