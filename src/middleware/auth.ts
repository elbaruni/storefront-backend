import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyAuth = (req: Request, res: Response, next: Function): void => {
  try {
    const authorizationHeader = req.headers.authorization || "";

    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);

    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401);
    res.json("Access denied, invalid token!");
    return;
  }
};

export default verifyAuth;
