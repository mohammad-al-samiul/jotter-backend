import { User, OTP } from "./auth.model";
import ApiError from "../../errors/ApiError";
import {
  compareData,
  generateOTP,
  generateToken,
  hashData,
} from "./auth.utils";
import {
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
} from "./auth.interface";
import { sendEmail } from "../../utils/sendEmail";
import { forgotOtpTemplate } from "../../utils/emailTemplates";

/* ================= REGISTER ================= */
export const registerUser = async (payload: IRegisterPayload) => {
  const { username, email, password, confirmPassword } = payload;

  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await hashData(password);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return user;
};

/* ================= LOGIN ================= */
export const loginUser = async (payload: ILoginPayload) => {
  const { email, password } = payload;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await compareData(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken({
    userId: user._id,
    email: user.email,
  });

  return { token };
};

/* ================= FORGOT PASSWORD ================= */
export const sendForgotOtp = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  // ⏳ invalidate old OTPs
  await OTP.deleteMany({ email });

  const otp = generateOTP();

  await OTP.create({
    email,
    otp, // 🔒 will be hashed by pre-save middleware
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  await sendEmail(email, "Password Reset OTP", forgotOtpTemplate(otp));

  return true;
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (payload: IResetPasswordPayload) => {
  const { email, otp, newPassword } = payload;

  const otpRecord = await OTP.findOne({ email });
  if (!otpRecord) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  // ⏳ expiry check
  if (otpRecord.expiresAt < new Date()) {
    await OTP.deleteMany({ email });
    throw new ApiError(400, "OTP expired");
  }

  // 🔍 compare hashed OTP
  const isValidOtp = await otpRecord.compareOtp(otp);
  if (!isValidOtp) {
    throw new ApiError(400, "Invalid OTP");
  }

  const hashedPassword = await hashData(newPassword);

  await User.findOneAndUpdate(
    { email },
    { password: hashedPassword }
  );

  // 🧹 cleanup
  await OTP.deleteMany({ email });

  return true;
};

/* ================= PIN ================= */
export const setPin = async (userId: string, pin: string) => {
  const hashedPin = await hashData(pin);
  await User.findByIdAndUpdate(userId, { pin: hashedPin });
  return true;
};

export const verifyPin = async (userId: string, pin: string) => {
  const user = await User.findById(userId);
  if (!user || !user.pin) throw new ApiError(404, "PIN not set");

  const isMatch = await compareData(pin, user.pin);
  if (!isMatch) throw new ApiError(401, "Invalid PIN");

  return true;
};
