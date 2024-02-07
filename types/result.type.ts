import type { PopulatedDoc } from 'mongoose';
import type { TQuestion } from './question.type';

export type TAnswer = {
  question: PopulatedDoc<TQuestion, string>,
  answer: number,
}
export type TResult = {
  uid?: string,
  ip?: string,
  user: string,
  answers: TAnswer[],
}