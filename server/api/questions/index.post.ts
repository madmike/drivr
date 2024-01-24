import { Question } from "../../models/question";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    console.log(body)
    // Save quiz result to MongoDB
    const { question, options, correctOption } = body;
    const result = await Question.create({ question, options, correctOption });

    console.log('Question is updated successfilly', result);

    // Respond to the client
    return result;
  } catch (error) {
    console.error('Error updating question to MongoDB', error);

    // Respond to the client with an error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed updating question',
    })
  }
});