import { Question } from "../../models/question";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Save question to MongoDB
    const { question, options, correctOption, description } = body;
    const newQuestion = await Question.create({ question, options, correctOption, description });

    console.log('Question is created successfilly', newQuestion);

    return newQuestion;
  } catch (error) {
    console.error('Error creating question in MongoDB', error);

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed creating question',
    })
  }
});