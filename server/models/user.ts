import { Schema, model } from "mongoose";

const UserSchema = new Schema<{login: string; password: string;}>({
  login: String,
  password: String,
}, {
  versionKey: false
});

export const User = model("User", UserSchema);