import express, { Request, Response } from "express";

const plugin = {
  register: async () => {
    const bookRouter = express.Router();

    await require('./model')();
    const routes = await require('./routes')(bookRouter)

    return bookRouter
  }
}

module.exports = plugin;