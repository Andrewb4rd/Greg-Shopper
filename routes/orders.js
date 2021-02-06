const ordersRouter = require("express").Router();
const { getAllOrders } = require("../db");

ordersRouter.use((req, res, next) => {
  console.log("a request is being made to /orders");

  next();
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();

    res.send({
      orders,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = ordersRouter;
