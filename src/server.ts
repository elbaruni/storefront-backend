import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { usersRoute, ordersRoute, productsRoute } from "./handlers";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 8000;
export const app: express.Application = express();
const address: string = `0.0.0.0:${port}`;
app.use(bodyParser.json());
app.use(cors());
app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/orders", ordersRoute);
app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
