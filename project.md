CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15) DEFAULT 'active',
    user_id int REFERENCES users(id)
);


CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id int REFERENCES orders(id),
    product_id int REFERENCES products(id)
);


db-migrate create users-table --sql-file
db-migrate create products-table --sql-file
db-migrate create orders-table --sql-file
db-migrate create order-products-table --sql-file