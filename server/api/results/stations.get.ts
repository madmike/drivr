import { Result } from "~/server/models/result";

export default defineEventHandler(async (event) => {
  const now = new Date();
  return await Result
    .find()
    .sort({ createdAt: 'desc' });
});