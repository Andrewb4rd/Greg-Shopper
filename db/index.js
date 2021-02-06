// Connect to DB
const { Client } = require("pg");
const DB_NAME = "change-this-name";
const DB_URL = process.env.DATABASE_URL || {
  user: "postgres",
  host: "localhost",
  database: "TMD",
  password: "2112",
  port: 5432,
};
const client = new Client(DB_URL);

// database methods

async function addDuckOrderToOrder(postId, tagList) {
  try {
    const createDuckOrderPromises = tagList.map((tag) =>
      createDuckOrder(postId, tag.id)
    );

    await Promise.all(createPostTagPromises);

    return await getPostById(postId);
  } catch (error) {
    throw error;
  }
}

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
      `,
      [username, password]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function createDuck({ name, price, imgUrl }) {
  try {
    const {
      rows: [duck],
    } = await client.query(
      `
      INSERT INTO ducks(name, price, imgUrl) 
      VALUES($1, $2, $3) 
      RETURNING *;
      `,
      [name, price, imgUrl]
    );

    return duck;
  } catch (error) {
    throw error;
  }
}

async function createDuckOrder({ orderId, duckId, quantity, price }) {
  try {
    const {
      rows: [duck],
    } = await client.query(
      `
      INSERT INTO duck_orders("orderId", "duckId", "quantity", "price")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ("orderId", "duckId") DO NOTHING;
    `,
      [orderId, duckId, quantity, price]
    );
  } catch (error) {
    throw error;
  }
}

async function createOrder({ userId }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders("userid") 
      VALUES($1)
      RETURNING *;
    `,
      [userId]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT id, username, password, admin
      FROM users
      WHERE id=${userId}
    `);

    if (!user) {
      return null;
    }

    user.orders = await getOrdersByUser(userId);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
SELECT * 
FROM users
WHERE username=$1;
    `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getDuckById(duckId) {
  try {
    const {
      rows: [duck],
    } = await client.query(
      `
      SELECT *
      FROM ducks
      WHERE id=$1;
    `,
      [duckId]
    );

    if (!duck) {
      throw {
        name: "DuckNotFoundError",
        message: "Could not find a duck with that duckId",
      };
    }

    return duck;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(orderId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      SELECT *
      FROM orders
      WHERE id=$1 AND checkedout=false;
    `,
      [orderId]
    );

    if (!order) {
      throw {
        name: "OrderNotFoundError",
        message: "Could not find a order with that orderId",
      };
    }

    const { rows: duck_orders } = await client.query(
      `
      SELECT duck_orders.*
      FROM duck_orders
      WHERE duck_orders."orderId"=$1;
    `,
      [orderId]
    );

    order.duck_orders = duck_orders;

    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, username, password, admin
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllDucks() {
  try {
    const { rows: duckIds } = await client.query(`
SELECT id
FROM ducks;
`);
    const ducks = await Promise.all(
      duckIds.map(async (duck) => {
        const duckObj = getDuckById(duck.id);
        return duckObj;
      })
    );
    return ducks;
  } catch (error) {
    console.log("error running getAllDucks");
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows } = await client.query(`
      SELECT id, userId, checkedOut
      FROM orders;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createUser,
  getAllUsers,
  createDuck,
  getAllDucks,
  getUserByUsername,
  getDuckById,
  getUserById,
  createOrder,
  createDuckOrder,
  getOrderById,
  getAllOrders,
  // db methods
};
