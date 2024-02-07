import { User } from "~/server/models/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { login, password } = body;

  const user = await User.findOne({ login, password })
  return { success: !!user };
});