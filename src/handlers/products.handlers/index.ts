import express, { Request, Response } from "express";
import { Product, ProductStore } from "../../models/";
import verifyAuth from "../../middleware/auth";

export const productsRoute = express.Router();
const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };

    const created = await store.create(product);

    res.json(created);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

productsRoute.get("/", index);
productsRoute.get("/:id", show);
productsRoute.post("/", verifyAuth, create);
