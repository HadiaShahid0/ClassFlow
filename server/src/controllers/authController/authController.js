import {
  registerService,
  verifyOtpService,
  loginService,
  verifyService,
  logoutService,
} from "../../services/authServices.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Register request:", {
      name,
      email,
      password,
    });

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    const result = await registerService(
      name,
      email,
      password
    );

    return res.status(201).json(result);
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(400).json({
      message: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required.",
      });
    }

    const result = await verifyOtpService(
      email,
      otp
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const result = await loginService(
      email,
      password
    );

    if (result.requiresMfa) {
      return res.status(200).json(result);
    }

    res.cookie("token", result.token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      requiresMfa: false,
      user: result.user,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getCurrentUser = async (
  req,
  res
) => {
  try {
    const user = await verifyService(
      req.user.id
    );

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isMfaEnabled: user.isMfaEnabled,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    logoutService();

    res.clearCookie("token");

    return res.status(200).json({
      message: "Logged out successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};