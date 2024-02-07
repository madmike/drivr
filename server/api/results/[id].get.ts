import { Result } from "~/server/models/result";

export default defineEventHandler(async (event) => {
  const uid = decodeURIComponent(getRouterParam(event, 'id') as string);
  const now = new Date();

  return await Result
    .findOne({ uid })
    .populate('answers.question');
});