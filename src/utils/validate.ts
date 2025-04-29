import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export default (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({ error: err.errors });
    }
  };
