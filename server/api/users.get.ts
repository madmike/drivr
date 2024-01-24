import { User } from "../models/user";

export default defineEventHandler(async (event) => {
  //await User.create({name: 'Vasya', email: 'vasya@piskin.com'})
  const users = await User.find();

  return users;
});