import User from "./user.js";
import TeacherProfile from "./teacherProfile.js";
import Class from "./classModel.js";
import StudentProfile from "./studentProfile.js"
// User → TeacherProfile
User.hasOne(TeacherProfile, {
  foreignKey: "userId",
  as: "teacherProfile",
});

TeacherProfile.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Organization → Teachers
User.hasMany(TeacherProfile, {
  foreignKey: "organizationId",
  as: "teachers",
});

TeacherProfile.belongsTo(User, {
  foreignKey: "organizationId",
  as: "organization",
});

// Organization → Classes
User.hasMany(Class, {
  foreignKey: "organizationId",
  as: "classes",
});

Class.belongsTo(User, {
  foreignKey: "organizationId",
  as: "organization",
});

// Teacher → Classes
User.hasMany(Class, {
  foreignKey: "teacherId",
  as: "assignedClasses",
});

Class.belongsTo(User, {
  foreignKey: "teacherId",
  as: "teacher",
});

// Teacher → Students
User.hasMany(StudentProfile, {
  foreignKey: "teacherId",
  as: "students",
});

StudentProfile.belongsTo(User, {
  foreignKey: "teacherId",
  as: "teacher",
});

// Class → Students
Class.hasMany(StudentProfile, {
  foreignKey: "classId",
  as: "students",
});

StudentProfile.belongsTo(Class, {
  foreignKey: "classId",
  as: "class",
});

// Student → User
User.hasOne(StudentProfile, {
  foreignKey: "userId",
  as: "studentProfile",
});

StudentProfile.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});