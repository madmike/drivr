import { Result } from "../models/result";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userName, quizResults } = body;

  try {
    console.log(body)
    // Save quiz result to MongoDB
    const result = await Result.create(quizResults.map(r =>
      ({
        user: userName,
        question: r.questionId,
        answer: r.answerIndex,
      })
    ));

    console.log('Quiz result saved successfully', result);

    // Respond to the client
    return { success: true };
  } catch (error) {
    console.error('Error saving quiz result to MongoDB', error);

    // Respond to the client with an error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save quiz result',
    })
  }
});