import * as bcrypt from "bcryptjs";
import ApiError from "../../errors/ApiError";
import { User } from "../auth/auth.model";
import { Folder } from "../folders/folder.model";
import { File } from "../files/file.model";
import { Note } from "../notes/note.model";
import { Favourite } from "../favorites/favourite.model";

/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (userId: string, payload: any) => {
  const user = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  }).select("-password");

  if (!user) throw new ApiError(404, "User not found");

  return user;
};
/* ================= GET PROFILE ================= */
export const getProfile = async (userId: string) => {
  const user = await User.findById(userId).select(
    "_id username email createdAt"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};
/* ================= CHANGE PASSWORD ================= */
export const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) throw new ApiError(400, "Old password incorrect");

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};

/* ================= DELETE ACCOUNT (CASCADE) ================= */
export const deleteAccount = async (userId: string) => {
  await Promise.all([
    Folder.deleteMany({ user: userId }),
    File.deleteMany({ user: userId }),
    Note.deleteMany({ user: userId }),
    Favourite.deleteMany({ user: userId }),
  ]);

  await User.findByIdAndDelete(userId);
};
