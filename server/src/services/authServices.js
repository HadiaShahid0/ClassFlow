import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../models/user.js";

import generateOtp from "../utils/generateOtp.js";
import sendOtpEmail from "../utils/sendMail.js";

import {
  generateToken,
  generateMfaToken,
  generatePasswordResetToken,
} from "../utils/generateToken.js";

import transporter from "../config/mail.js";

// Register
export const registerService = async (
  name,
  email,
  password
) => {
  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = generateOtp();

  const otpExpiredAt = new Date(
    Date.now() + 10 * 60 * 1000
  );

  let user;

  try {
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "organization",
      isVerified: false,
      otp,
      otpExpiredAt,
    });

    await sendOtpEmail(email, otp);
  } catch (error) {
    console.error("Registration error:", error);

    // If user was created but email failed,
    // remove the user.
    if (user) {
      await user.destroy();
    }

    throw new Error("Unable to complete registration.");
  }

  return {
    message: "OTP sent successfully.",
  };
};

// Login
export const loginService = async (
  email,
  password
) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  if (!user.isVerified) {
    throw new Error(
      "Please verify your email before logging in."
    );
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password.");
  }

  if (user.isMfaEnabled) {
    const mfaToken = generateMfaToken(user.id);

    return {
      requiresMfa: true,
      mfaToken,
    };
  }

  const token = generateToken(user.id);

  return {
    requiresMfa: false,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isMfaEnabled: user.isMfaEnabled,
    },
  };
};

// Verify User
export const verifyService = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
};

// Verify OTP
export const verifyOtpService = async (
  email,
  otp
) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.isVerified) {
    throw new Error("Email is already verified.");
  }

  if (!user.otp || user.otp !== otp.toString()) {
    throw new Error("Invalid OTP.");
  }

  if (
    !user.otpExpiredAt ||
    new Date() > new Date(user.otpExpiredAt)
  ) {
    throw new Error("OTP has expired.");
  }

  await user.update({
    isVerified: true,
    otp: null,
    otpExpiredAt: null,
  });

  return {
    message: "Email verified successfully.",
  };
};

// Logout
export const logoutService = () => {
  return true;
};

// Forgot Password
export const forgotPasswordService = async (
  email
) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("Email does not exist.");
  }

  const resetPasswordOtp = crypto
    .randomInt(100000, 1000000)
    .toString();

  const resetPasswordOtpExpiredAt = new Date(
    Date.now() + 3 * 60 * 1000
  );

  await user.update({
    resetPasswordOtp,
    resetPasswordOtpExpiredAt,
  });

  const mailOption = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset OTP",
    text: `Your password reset OTP is ${resetPasswordOtp}. This OTP will expire in 3 minutes.`,
  };

  try {
    await transporter.sendMail(mailOption);

    return {
      message: "Password reset OTP sent successfully.",
    };
  } catch (error) {
    console.error(
      "Password reset email error:",
      error
    );

    await user.update({
      resetPasswordOtp: null,
      resetPasswordOtpExpiredAt: null,
    });

    throw new Error(
      "Unable to send password reset email."
    );
  }
};

// Verify Reset OTP
export const verifyResetOtpService = async (
  email,
  otp
) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user || !user.resetPasswordOtp) {
    throw new Error("Invalid or expired OTP.");
  }

  if (
    !user.resetPasswordOtpExpiredAt ||
    new Date() >
      new Date(user.resetPasswordOtpExpiredAt)
  ) {
    await user.update({
      resetPasswordOtp: null,
      resetPasswordOtpExpiredAt: null,
    });

    throw new Error("OTP has expired.");
  }

  if (
    user.resetPasswordOtp !== otp.toString()
  ) {
    throw new Error("Invalid OTP.");
  }

  const resetToken =
    generatePasswordResetToken(user.id);

  await user.update({
    resetPasswordOtp: null,
    resetPasswordOtpExpiredAt: null,
  });

  return {
    message: "OTP verified successfully.",
    resetToken,
  };
};

// Reset Password
export const resetPasswordService = async (
  userId,
  newPassword
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    10
  );

  await user.update({
    password: hashedPassword,
  });

  return {
    message: "Password reset successfully.",
  };
};