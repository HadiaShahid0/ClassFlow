import {
  updateUserRoleService,
} from "../../services/adminServices/adminServices.js";

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        message: "Role is required.",
      });
    }

    const result = await updateUserRoleService(
      req.params.userId,
      role
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
