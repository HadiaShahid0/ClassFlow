import {
  createClassService,
  getClassesService,
  getClassByIdService,
  updateClassService,
  assignTeacherService,
  deleteClassService,
} from "../../services/classServices.js";

const createClass = async (req, res) => {
  try {
    const { name, description, teacherId } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Class name is required.",
      });
    }

    const result = await createClassService(
      req.user.id,
      name,
      description,
      teacherId
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getClasses = async (req, res) => {
  try {
    const classes = await getClassesService(req.user.id);

    return res.status(200).json({
      classes,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getClassById = async (req, res) => {
  try {
    const classData = await getClassByIdService(
      req.user.id,
      req.params.classId
    );

    return res.status(200).json({
      class: classData,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const updateClass = async (req, res) => {
  try {
    const { name, description } = req.body;

    const result = await updateClassService(
      req.user.id,
      req.params.classId,
      name,
      description
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const assignTeacher = async (req, res) => {
  try {
    const { teacherId } = req.body;

    if (!teacherId) {
      return res.status(400).json({
        message: "Teacher ID is required.",
      });
    }

    const result = await assignTeacherService(
      req.user.id,
      req.params.classId,
      teacherId
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteClass = async (req, res) => {
  try {
    const result = await deleteClassService(
      req.user.id,
      req.params.classId
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  assignTeacher,
  deleteClass,
};