import express, { Request, Response } from "express";

const plugin = {
  register: async () => {
    const userRouter = express.Router();

    await require('./model')();
    const routes = await require('./routes')(userRouter)

    return userRouter
  }
}

module.exports = plugin;