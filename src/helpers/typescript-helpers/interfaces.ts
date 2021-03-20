import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  originUrl: string;
}

export interface ISession extends Document {
  uid: string;
}

export interface IJWTPayload {
  uid: string;
  sid: string;
}

export interface IQuestion {
  question: string;
  questionId: number;
  answers: string[];
}
