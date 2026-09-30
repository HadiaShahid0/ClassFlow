import {
  createStudentService,
  getStudentsService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
} from "../../services/studentServices.js";

export const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      classId,
      rollNumber,
      phone,
    } = req.body;

    if (!name || !email || !password || !classId) {
      return res.status(400).json({
        message:
          "Name, email, password and class are required.",
      });
    }

    const result = await createStudentService(
      req.user.id,
      name,
      email,
      password,
      classId,
      rollNumber,
      phone
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await getStudentsService(req.user.id);

    return res.status(200).json({
      students,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await getStudentByIdService(
      req.user.id,
      req.params.studentId
    );

    return res.status(200).json({
      student,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      phone,
      classId,
    } = req.body;

    const result = await updateStudentService(
      req.user.id,
      req.params.studentId,
      name,
      rollNumber,
      phone,
      classId
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const result = await deleteStudentService(
      req.user.id,
      req.params.studentId
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

