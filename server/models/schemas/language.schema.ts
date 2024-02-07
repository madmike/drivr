import { Schema } from 'mongoose';

export const SLanguage = new Schema({
  ru: String,
  en: String,
}, {
  _id: false,
});