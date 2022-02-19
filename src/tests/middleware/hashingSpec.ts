import { hash, compare } from "../../middleware/hashing";

let hashed: string;

export default describe("User Model", () => {
  console.log("hashing test");
  it("hashes passowrd", () => {
    const password = "password";
    hashed = hash(password);
    expect(hashed).not.toEqual(password);
  });
  it("compares hashed password", () => {
    const password = "password";
    expect(compare(password, hashed)).toBeTruthy();
  });
});
