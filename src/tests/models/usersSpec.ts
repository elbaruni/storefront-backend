import { UserStore } from "../../models/users.models";

const store = new UserStore();

export default describe("User Model", () => {
  console.log("User Model test");
  it("should have index  method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have show  method", () => {
    expect(store.show).toBeDefined();
  });
  it("should have create  method", () => {
    expect(store.create).toBeDefined();
  });
  it("should have authenticate  method", () => {
    expect(store.authenticate).toBeDefined();
  });

  it("create method should add a user", async () => {
    // const users = await store.index();

    const created = await store.create({
      username: "username",
      firstName: "first name",
      lastName: "last name",
      password_digest: "password",
    });
    expect(created.id).toEqual(1);
  });

  it("authenticate valid username and password", async () => {
    const authenticated = await store.authenticate("username", "password");
    expect(authenticated).toBeTruthy();
  });

  it("authenticate valid username wrong password", async () => {
    const authenticated = await store.authenticate("username", "wrong");
    expect(authenticated).toBeFalsy();
  });

  it("authenticate invalid username ", async () => {
    const authenticated = await store.authenticate("username1", "password");
    expect(authenticated).toBeFalsy();
  });
});
