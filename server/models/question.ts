import paginate from 'mongoose-paginate-v2';
import { PaginateModel, Schema, model } from "mongoose";
import { SLanguage } from "./schemas/language.schema";
import { TQuestion } from "~/types/question.type";

const schema = new Schema<TQuestion>({
  type: { type: String, index: true },
  idx: { type: Number, index: true },
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

schema.plugin(paginate);
export const Question = model<TQuestion, PaginateModel<TQuestion>>('Question', schema);