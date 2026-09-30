import authRoutes from "./authRoutes.js";
import mfaRoutes from "./mfaRoutes.js";
import organizationRoutes from "./organizationRoutes.js";
import StudentRoutes from "./studentRoutes.js";
import classRoutes from "./classRoutes.js";

const routes = (app) => {
  app.use("/api/auth", authRoutes);

  app.use("/api/auth/mfa", mfaRoutes);

  app.use("/api/organization", organizationRoutes);

  app.use("/api/classes", classRoutes);

  app.use("/api/teacher/students", StudentRoutes);
};

export default routes;