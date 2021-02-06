const ducksRouter = require("express").Router();
const { getAllDucks, createDuck, getDuckById } = require("../db");

ducksRouter.use((req, res, next) => {
  console.log("a request is being made to /ducks");

  next();
});

ducksRouter.get("/", async (req, res, next) => {
  try {
    const ducks = await getAllDucks();

    res.send({
      ducks,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ducksRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const duck = await getDuckById(id);

    res.send({
      duck,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = ducksRouter;
