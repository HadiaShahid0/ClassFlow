// import dotenv from "dotenv";

// dotenv.config();

// const verifyCaptcha = async (req, res, next) => {
//   try {
//     const { captchaToken } = req.body;

//     if (!captchaToken) {
//       return res.status(400).json({
//         message: "Please complete the CAPTCHA.",
//       });
//     }

//     console.log("CAPTCHA token received:", !!captchaToken);
//     console.log(
//       "CAPTCHA secret exists:",
//       !!process.env.RECAPTCHA_SECRET_KEY
//     );

//     const response = await fetch(
//       "https://www.google.com/recaptcha/api/siteverify",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           secret: process.env.RECAPTCHA_SECRET_KEY,
//           response: captchaToken,
//         }),
//       }
//     );

//     const data = await response.json();

//     console.log("Google CAPTCHA response:", data);

//     if (!data.success) {
//       return res.status(400).json({
//         message: "CAPTCHA verification failed.",
//         errors: data["error-codes"],
//       });
//     }

//     next();
//   } catch (error) {
//     console.error("CAPTCHA error:", error);

//     return res.status(500).json({
//       message: "CAPTCHA verification failed.",
//     });
//   }
// };

// export default verifyCaptcha;