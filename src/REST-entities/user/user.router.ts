import { Router } from "express";
import tryCatchWrapper from "../../helpers/function-helpers/try-catch-wrapper";
import { authorize } from "../../auth/auth.controller";
import { getEmail } from "./user.controller";

const router = Router();

router.get("/", tryCatchWrapper(authorize), tryCatchWrapper(getEmail));

export default router;
