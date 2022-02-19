import { OrderStore } from "../../models/";
const store = new OrderStore();

export default describe("Orders Model", () => {
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
  it("should have addProduct  method", () => {
    expect(store.addProduct).toBeDefined();
  });
  it("should have currentOrdersByUser  method", () => {
    expect(store.currentOrdersByUser).toBeDefined();
  });
  it("should create new order", async () => {
    const user_id: number = 1;
    const created = await store.create(user_id);
    expect(created.id).toEqual(1);
  });
  it("should add new product to order", async () => {
    const created = await store.addProduct({
      order_id: 1,
      product_id: 1,
      quantity: 10,
    });
    expect(created.id).toEqual(1);
    expect(created.quantity).toEqual(10);
  });

  it("should return current orders by user", async () => {
    const user_id: number = 1;
    const orders = await store.currentOrdersByUser(user_id);
    expect(orders).toEqual([{ id: 1, status: "active", user_id: 1 }]);
  });
});
