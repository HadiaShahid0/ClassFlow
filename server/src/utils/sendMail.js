import transporter from "../config/mail.js";

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "ClassFlow Email Verification OTP",
    html: `
      <div>
        <h2>HackathonDesk Email Verification</h2>

        <p>Your verification code is:</p>

        <h1>${otp}</h1>

        <p>This OTP will expire in 10 minutes.</p>

        <p>If you did not create this account, you can ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendOtpEmail;