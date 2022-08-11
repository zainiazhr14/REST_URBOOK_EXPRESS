import express, { Request, Response } from "express";

const plugin = {
  register: async () => {
    const writerRouter = express.Router();

    await require('./model')();
    const routes = await require('./routes')(writerRouter)

    return writerRouter
  }
}

module.exports = plugin;