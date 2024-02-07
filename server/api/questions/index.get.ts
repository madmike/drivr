import { SeedQuestions } from "~/seeds/questions";
import { Question } from "~/server/models/question";

export default defineEventHandler(async (event) => {
  const count = await Question.countDocuments();
  return count > 0 ? Question.find() : Question.create(SeedQuestions);
});