import { Question } from "../../models/question";

export default defineEventHandler(async (event) => {
  const { category, section } = getQuery(event);
  let query = {
    ...(category ? { type: category } : {}),
    ...(section && +section > 0 ? { idx: +section } : {}),
  };

  const count = section && +section === -1 ? 50 : await Question.countDocuments(query);

  return Question.aggregate([
    { $match: query },
    { $sample: { size: (category || section) ? count : 50 } }
  ]);
});