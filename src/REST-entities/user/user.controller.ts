import { Request, Response } from "express";

export const getEmail = (req: Request, res: Response) => {
  const user = req.user;
  return res.status(200).send({ email: user?.email });
};
