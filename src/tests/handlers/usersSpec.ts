import supertest from "supertest";
import { app } from "../../server";
import jwt from "jsonwebtoken";
import { UserStore } from "../../models";
const apiPath = "/users";
const request = supertest(app);
const userName: string = "testUserName";
const userId: number = 0;
const testToken = jwt.sign(
  { userId: userId, userName: userName, expiresIn: "1h" },
  process.env.TOKEN_SECRET!
);

export default describe("Test Users handlers", () => {
  console.log("Users Handlers test");
  beforeAll(() => {
    spyOn(UserStore.prototype, "index").and.returnValue(
      Promise.resolve([
        {
          id: 1,
          username: "user001",
          firstname: "first",
          lastname: "last",
        },
      ])
    );
    spyOn(UserStore.prototype, "show").and.returnValue(
      Promise.resolve({
        id: 1,
        username: "user001",
        firstname: "first",
        lastname: "last",
      })
    );

    spyOn(UserStore.prototype, "create").and.returnValue(
      Promise.resolve({
        id: 1,
        username: "user001",
        firstname: "first",
        lastname: "last",
      })
    );

    spyOn(UserStore.prototype, "authenticate").and.returnValue(
      Promise.resolve({
        id: 1,
        username: "user001",
        firstname: "first",
        lastname: "last",
      })
    );
  });
  it("index users ", async () => {
    const response = await request
      .get(apiPath)
      .set("Authorization", "Bearer " + testToken);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, username: "user001", firstname: "first", lastname: "last" },
    ]);
  });
  it("show users ", async () => {
    const response = await request
      .get(`${apiPath}/1`)
      .set("Authorization", "Bearer " + testToken);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      username: "user001",
      firstname: "first",
      lastname: "last",
    });
  });
  it("creates user ", async () => {
    const response = await request.post(apiPath).send({
      username: "userTest1",
      firstname: "first test",
      lastname: "last test",
      password_digest: "1111",
    });

    expect(response.status).toBe(200);
  });

  it("authenticates user ", async () => {
    const response = await request.post(`${apiPath}/authenticate`).send({
      username: "userTest1",
      password: "1111",
    });

    expect(response.status).toBe(200);
    const decode: any = jwt.verify(response.body, process.env.TOKEN_SECRET!);

    expect(decode["userId"]).toEqual(1);
  });
});
