import { nanoid } from "nanoid";
import { Schema, model } from "mongoose";

import { TResult } from "~/types/result.type";
import { Question } from "./question";

const schema = new Schema<TResult>({
  uid: { type: String, unique: true },
  ip: String,
  user: String,
  answers: [{
    _id: false,
    question: { type: Schema.ObjectId, ref: Question, index: true },
    answer: Number
  }]
}, {
  versionKey: false,
  timestamps: true
});

schema.pre('save', function (next) {
  if (!this.uid) {
    this.uid = nanoid();
  }

  return next();
});

schema.pre(['updateOne', 'findOneAndUpdate'], async function (next) {
  const query = this.getQuery() as any;
  const data = this.getUpdate() as any;
  
  if (!query.uid && !data.uid && !data.$set.uid) {
    this.set({ uid: nanoid() });
  }

  return next();
});

export const Result = model('Result', schema);