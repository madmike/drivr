import { Question } from "../../models/question";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Update question in MongoDB
    const { question, options, correctOption, description } = body;
    const updatedQuestion = await Question.findByIdAndUpdate(body._id, {$set: { question, options, correctOption, description }}, { new: true });

    return updatedQuestion;
  } catch (error) {
    console.error('Error updating question in MongoDB', error);

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed updating question',
    })
  }
});