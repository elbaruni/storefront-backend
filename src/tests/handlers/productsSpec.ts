import supertest from "supertest";
import { app } from "../../server";
import { ProductStore } from "../../models";
import jwt from "jsonwebtoken";
const apiPath = "/products";
const request = supertest(app);
const userName: string = "userTest1";
const userId: number = 1;
const testToken = jwt.sign(
  { userId: userId, userName: userName, expiresIn: "1h" },
  process.env.TOKEN_SECRET!
);

export default describe("Test products handlers", () => {
  console.log("Products Handlers test");
  beforeAll(() => {
    spyOn(ProductStore.prototype, "index").and.returnValue(
      Promise.resolve([{ id: 1, name: "pro", price: 10 }])
    );
    spyOn(ProductStore.prototype, "show").and.returnValue(
      Promise.resolve({ id: 1, name: "pro", price: 10 })
    );

    spyOn(ProductStore.prototype, "create").and.returnValue(
      Promise.resolve({ id: 1, name: "pro", price: 10 })
    );
  });

  it("index products ", async () => {
    const response = await request.get(apiPath);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "pro", price: 10 }]);
  });
  it("show product by id ", async () => {
    const response = await request.get(`${apiPath}/1`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "pro", price: 10 });
  });
  it("creates product ", async () => {
    const response = await request
      .post(apiPath)
      .set("Authorization", "Bearer " + testToken);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "pro", price: 10 });
  });
});
