import Client from "../../database";
import { hash, compare } from "../../middleware/hashing";

export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  password_digest: string;
};

export type UserRetrun = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
};

export class UserStore {
  async index(): Promise<UserRetrun[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT id,username,firstName,lastName FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<UserRetrun> {
    try {
      const sql =
        "SELECT  username,firstName,lastName FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<UserRetrun> {
    try {
      const sql =
        "INSERT INTO users (username,firstName,lastName,password_digest) VALUES($1, $2,$3,$4) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const passwordHash = hash(u.password_digest);
      const result = await conn.query(sql, [
        u.username,
        u.firstname,
        u.lastname,
        passwordHash,
      ]);
      const user = result.rows[0];
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new User ${u.firstname}. Error: ${err}`);
    }
  }
  async authenticate(
    username: string,
    password: string
  ): Promise<UserRetrun | null> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM Users WHERE username=($1)";
      const result = await conn.query(sql, [username]);
      conn.release();
      if (result.rows.length) {
        if (compare(password, result.rows[0].password_digest))
          return {
            id: result.rows[0].id,
            username: result.rows[0].username,
            firstname: result.rows[0].firstname,
            lastname: result.rows[0].lastname,
          };
        result.rows[0];
      }
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
    return null;
  }
}
