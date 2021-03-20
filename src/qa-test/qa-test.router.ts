import { Router } from "express";
import Joi from "joi";
import tryCatchWrapper from "../helpers/function-helpers/try-catch-wrapper";
import validate from "../helpers/function-helpers/validate";
import { authorize } from "../auth/auth.controller";
import {
  loadTechTest,
  loadTheoryTest,
  techResults,
  theoryResults,
} from "./qa-test.controller";

const getTechResultSchema = Joi.object({
  answers: Joi.array()
    .min(12)
    .max(12)
    .items(
      Joi.object({
        questionId: Joi.number().min(1).max(26).required(),
        answer: Joi.string().required(),
      })
    )
    .required(),
});

const getTheoryResultSchema = Joi.object({
  answers: Joi.array()
    .min(12)
    .max(12)
    .items(
      Joi.object({
        questionId: Joi.number().min(1).max(31).required(),
        answer: Joi.string().required(),
      })
    )
    .required(),
});

const router = Router();

router.get("/tech", tryCatchWrapper(authorize), tryCatchWrapper(loadTechTest));
router.get(
  "/theory",
  tryCatchWrapper(authorize),
  tryCatchWrapper(loadTheoryTest)
);
router.post(
  "/tech-results",
  tryCatchWrapper(authorize),
  validate(getTechResultSchema),
  tryCatchWrapper(techResults)
);
router.post(
  "/theory-results",
  tryCatchWrapper(authorize),
  validate(getTheoryResultSchema),
  tryCatchWrapper(theoryResults)
);

export default router;
