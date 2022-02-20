import express, { Request, Response } from "express";
import { User, UserStore } from "../../models/";
import verifyAuth from "../../middleware/auth";
import jwt from "jsonwebtoken";

export const usersRoute = express.Router();
const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password_digest: req.body.password,
    };

    const created = await store.create(user);

    const token = jwt.sign(
      { userId: created.id, userName: created.username, expiresIn: "1h" },
      process.env.TOKEN_SECRET!
    );

    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const authenticated = await store.authenticate(
    req.body.username,
    req.body.password
  );

  if (!authenticated) {
    res.status(401);
  } else {
    const token = jwt.sign(
      {
        userId: authenticated.id,
        userName: authenticated.username,
        expiresIn: "1h",
      },
      process.env.TOKEN_SECRET!
    );

    res.json(token);
  }
};

usersRoute.get("/", verifyAuth, index);
usersRoute.get("/:id", verifyAuth, show);
usersRoute.post("/", create);
usersRoute.post("/authenticate", authenticate);
