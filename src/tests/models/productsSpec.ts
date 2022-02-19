/* import { OrderStore } from '../../models/orders'; */
import { ProductStore } from "../../models/products.models";

/* const store = new OrderStore(); */
const store = new ProductStore();
export default describe("Products Model", () => {
  console.log("Orders Model test");
  it("should have index  method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have show  method", () => {
    expect(store.show).toBeDefined();
  });
  it("should have create  method", () => {
    expect(store.create).toBeDefined();
  });

  it("create new product", async () => {
    const created = await store.create({
      name: "prod1",
      price: 100,
    });
    expect(created.id).toEqual(1);
    expect(created.name).toEqual("prod1");
  });
});
