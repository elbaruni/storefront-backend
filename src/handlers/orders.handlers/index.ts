import express, { Request, Response } from "express";
import { OrderStore } from "../../models/";
import verifyAuth from "../../middleware/auth";
export const ordersRoute = express.Router();
const store = new OrderStore();
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
    const created = await store.create(req.userData.userId);
    res.json(created);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};
const addProduct = async (req: Request, res: Response) => {
  try {
    const added = await store.addProduct({
      order_id: Number(req.body.order_id),
      product_id: Number(req.body.product_id),
      quantity: Number(req.body.quantity),
    });
    res.json(added);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};
const currentOrdersByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.currentOrdersByUser(Number(req.params.user_id));

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

ordersRoute.get("/", verifyAuth, index);
ordersRoute.get("/:id", verifyAuth, show);
ordersRoute.get("/byuser/:user_id", verifyAuth, currentOrdersByUser);
ordersRoute.post("/", verifyAuth, create);
ordersRoute.put("/", verifyAuth, addProduct);
