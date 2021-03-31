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
  let mainMessage = "";
  let secondaryMessage = "";
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
  if (result <= 10) {
    mainMessage = "Oh no!";
    secondaryMessage = "You lack basic QA knowledge";
  }
  if (result > 10 && result <= 30) {
    mainMessage = "Maybe next time";
    secondaryMessage = "Your QA knowledge is pretty weak, but don't give up!";
  }
  if (result > 30 && result <= 50) {
    mainMessage = "Keep improving";
    secondaryMessage = "Keep learning and you'll get there!";
  }
  if (result > 50 && result <= 70) {
    mainMessage = "Getting there!";
    secondaryMessage =
      "Good result, but you still lack some basics of QA knowledge";
  }
  if (result > 70 && result <= 90) {
    mainMessage = "Not bad!";
    secondaryMessage = "But you still need to learn some materials";
  }
  if (result > 90 && result <= 99) {
    mainMessage = "Great!";
    secondaryMessage = "You have very strong QA knowledge";
  }
  if (Math.round(result) === 100) {
    mainMessage = "Perfect!";
    secondaryMessage =
      "You've answered all questions correctly, congratulations!";
  }
  return res
    .status(200)
    .send({ result: `${Math.round(result)}%`, mainMessage, secondaryMessage });
};

export const theoryResults = (req: Request, res: Response) => {
  const answers = req.body.answers;
  let result = 0;
  let mainMessage = "";
  let secondaryMessage = "";
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
  if (result <= 10) {
    mainMessage = "Oh no!";
    secondaryMessage = "You lack basic QA knowledge";
  }
  if (result > 10 && result <= 30) {
    mainMessage = "Maybe next time";
    secondaryMessage = "Your QA knowledge is pretty weak, but don't give up!";
  }
  if (result > 30 && result <= 50) {
    mainMessage = "Keep improving";
    secondaryMessage = "Keep learning and you'll get there!";
  }
  if (result > 50 && result <= 70) {
    mainMessage = "Getting there!";
    secondaryMessage =
      "Good result, but you still lack some basics of QA knowledge";
  }
  if (result > 70 && result <= 90) {
    mainMessage = "Not bad!";
    secondaryMessage = "But you still need to learn some materials";
  }
  if (result > 90 && result <= 99) {
    mainMessage = "Great!";
    secondaryMessage = "You have very strong QA knowledge";
  }
  if (Math.round(result) === 100) {
    mainMessage = "Perfect!";
    secondaryMessage =
      "You've answered all questions correctly, congratulations!";
  }
  return res
    .status(200)
    .send({ result: `${Math.round(result)}%`, mainMessage, secondaryMessage });
};
