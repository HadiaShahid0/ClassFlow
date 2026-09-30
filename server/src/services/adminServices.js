import User from "../../models/User.js";

export const updateUserRoleService = async (userId, role) => {
  const allowedRoles = ["organization", "teachers", "students"];

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role.");
  }

  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  user.role = role;

  await user.save();

  return {
    message: "User role updated successfully.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
