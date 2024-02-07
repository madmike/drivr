import { Question } from "../../models/question";

export default defineEventHandler(async (event) => {
  return Question.aggregate([{ $sample: { size: 60 } }]);
});