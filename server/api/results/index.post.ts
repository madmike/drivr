import { TResult } from "~/types/result.type";
import { Result } from "../../models/result";

type TUserResults = {
  userName: string;
  quizResults: TResult[];
}

export default defineEventHandler(async (event) => {
  const ip = event.headers.get('x-forwarded-for')?.split(/, /)?.[0] || event.node.req.socket.remoteAddress;
  let { user, uid, answers } = await readBody(event) as TResult;

  try {
    if (uid) {
      await Result.findOneAndUpdate({ uid }, { $push: { answers: answers[0] }});
    } else {
      uid = (await Result.findOneAndUpdate({ ip }, { user, answers }, { upsert: true, new: true })).uid;
    }

    return { uid, success: true };
  } catch (error) {
    console.error('Error saving quiz result to MongoDB', error);

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save quiz result',
    })
  }
});