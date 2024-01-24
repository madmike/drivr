import { Schema, model } from "mongoose";
import { Question } from "./question";

const resultSchema = new Schema({
  user: String,
  question: { type: Schema.ObjectId, ref: Question},
  answer: Number
}, {
  versionKey: false,
  timestamps: true
});

export const Result = model('Result', resultSchema);