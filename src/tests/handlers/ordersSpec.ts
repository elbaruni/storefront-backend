import supertest from "supertest";
import { app } from "../../server";
import { OrderStore } from "../../models";
import jwt from "jsonwebtoken";
const apiPath = "/orders";
const request = supertest(app);
const userName: string = "userTest1";
const userId: number = 1;
const testToken = jwt.sign(
  { userId: userId, userName: userName, expiresIn: "1h" },
  process.env.TOKEN_SECRET!
);

export default describe("Test Orders handlers", () => {
  console.log("Orders Handlers test");
  beforeAll(() => {
    spyOn(OrderStore.prototype, "index").and.returnValue(
      Promise.resolve([{ id: 1, status: "active", user_id: 10 }])
    );
    spyOn(OrderStore.prototype, "show").and.returnValue(
      Promise.resolve({ id: 1, status: "active", user_id: 10 })
    );

    spyOn(OrderStore.prototype, "create").and.returnValue(
      Promise.resolve({ id: 1, status: "active", user_id: 10 })
    );
    spyOn(OrderStore.prototype, "addProduct").and.returnValue(
      Promise.resolve({ id: 1, order_id: 1, product_id: 2, quantity: 30 })
    );
    spyOn(OrderStore.prototype, "currentOrdersByUser").and.returnValue(
      Promise.resolve([{ id: 1, status: "active", user_id: 10 }])
    );
  });
  it("index orders ", async () => {
    const response = await request.get(apiPath);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, status: "active", user_id: 10 }]);
  });
  it("show order by id ", async () => {
    const response = await request.get(`${apiPath}/1`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, status: "active", user_id: 10 });
  });
  it("creates order ", async () => {
    const response = await request
      .post(apiPath)
      .set("Authorization", "Bearer " + testToken);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, status: "active", user_id: 10 });
  });

  it("add product to order", async () => {
    const response = await request
      .put(apiPath)
      .set("Authorization", "Bearer " + testToken);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      order_id: 1,
      product_id: 2,
      quantity: 30,
    });
  });
});
