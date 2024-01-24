import { Schema, model } from "mongoose";

const questionSchema = new Schema({
  question: String,
  options: [String],
  correctOption: Number,
}, {
  versionKey: false
});
questionSchema.set('toJSON', {
  virtuals: true
});

export const Question = model('Question', questionSchema);