import express, { Request, Response } from "express";

const plugin = {
  register: async () => {
    const fileRouter = express.Router();

    await require('./model')();
    const routes = await require('./routes')(fileRouter)

    return fileRouter
  }
}

module.exports = plugin;