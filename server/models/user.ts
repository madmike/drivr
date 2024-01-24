import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
}, {
  versionKey: false
});

export const User = model("User", UserSchema);