import { Request, Response } from "express";
import qaTechTest from "./qa-tech";
import qaTheoryTest from "./qa-theory";
import { IQuestion } from "../helpers/typescript-helpers/interfaces";

export const loadTechTest = (req: Request, res: Response) => {
  let filteredTest: IQuestion[] = [];
  const test = qaTechTest.map((item) => ({
    question: item.question,
    questionId: item.questionId,
    answers: item.answers,
  }));
  while (filteredTest.length < 12) {
    const randomIndex = Math.floor(Math.random() * 26);
    if (filteredTest.includes(test[randomIndex])) {
      continue;
    }
    filteredTest.push(test[randomIndex]);
  }
  res.status(200).send(filteredTest);
};

export const loadTheoryTest = (req: Request, res: Response) => {
  let filteredTest: IQuestion[] = [];
  const test = qaTheoryTest.map((item) => ({
    question: item.question,
    questionId: item.questionId,
    answers: item.answers,
  }));
  while (filteredTest.length < 12) {
    const randomIndex = Math.floor(Math.random() * 26);
    if (filteredTest.includes(test[randomIndex])) {
      continue;
    }
    filteredTest.push(test[randomIndex]);
  }
  res.status(200).send(filteredTest);
};

export const techResults = (req: Request, res: Response) => {
  const answers = req.body.answers;
  let result = 0;
  const questionIds = [
    ...new Set(
      answers.map(
        (item: { questionId: number; answer: string }) => item.questionId
      )
    ),
  ];
  if (questionIds.length !== 12) {
    return res.status(400).send({ message: "Questions must be unique" });
  }
  answers.forEach((item: { questionId: number; answer: string }) => {
    const question = qaTechTest.find(
      (question) => question.questionId === item.questionId
    );
    if (
      (question as {
        question: string;
        questionId: number;
        answers: string[];
        rightAnswer: string;
      }).rightAnswer === item.answer
    ) {
      result += 8.33333;
    }
  });
  return res.status(200).send({ result: `${Math.round(result)}%` });
};

export const theoryResults = (req: Request, res: Response) => {
  const answers = req.body.answers;
  let result = 0;
  const questionIds = [
    ...new Set(
      answers.map(
        (item: { questionId: number; answer: string }) => item.questionId
      )
    ),
  ];
  if (questionIds.length !== 12) {
    return res.status(400).send({ message: "Questions must be unique" });
  }
  answers.forEach((item: { questionId: number; answer: string }) => {
    const question = qaTheoryTest.find(
      (question) => question.questionId === item.questionId
    );
    if (
      (question as {
        question: string;
        questionId: number;
        answers: string[];
        rightAnswer: string;
      }).rightAnswer === item.answer
    ) {
      result += 8.33333;
    }
  });
  return res.status(200).send({ result: `${Math.round(result)}%` });
};
