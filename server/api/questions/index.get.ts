//import { SeedQuestions } from "~/seeds/questions";
import { Question } from "~/server/models/question";

export default defineEventHandler(async (event) => {
  //const count = await Question.countDocuments();
  const { category, section, page, limit } = getQuery(event);
  let query: any = {};

  if (category || section) {
    query.type = category;
    query.idx = section;
  }

  return Question.paginate(query, { page: (page as number) || 1, limit: (limit as number) || 10 });
});