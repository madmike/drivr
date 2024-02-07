import { Schema, model } from "mongoose";
import { SLanguage } from "./schemas/language.schema";
import { TQuestion } from "~/types/question.type";

const schema = new Schema<TQuestion>({
  question: SLanguage,
  options: [SLanguage],
  correctOption: Number,
  description: SLanguage,
}, {
  versionKey: false
});

schema.set('toJSON', {
  virtuals: true
});

export const Question = model('Question', schema);