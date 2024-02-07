import type { TLanguage } from "./language.type";

export type TQuestion = {
  _id?: string;
  question: TLanguage;
  options: TLanguage[];
  correctOption: number;
  description: TLanguage;
}