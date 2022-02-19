import Client from "../../database";

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};
export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(user_id: number): Promise<Order> {
    try {
      const sql = "INSERT INTO orders (user_id) VALUES($1) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [user_id]);
      const row = result.rows[0];
      conn.release();
      return row;
    } catch (err) {
      throw new Error(`Could not add a new row. Error: ${err}`);
    }
  }

  async addProduct(order_product: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        order_product.quantity,
        order_product.order_id,
        order_product.product_id,
      ]);

      const row = result.rows[0];
      conn.release();
      return row;
    } catch (err) {
      throw new Error(
        `Could not add product ${order_product.product_id} to order ${order_product.order_id}: ${err}`
      );
    }
  }

  async currentOrdersByUser(user_id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const status = "active";
      const sql =
        "SELECT * FROM orders WHERE user_id = ($1) AND status = ($2) ";

      const result = await conn.query(sql, [user_id, status]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }
}
