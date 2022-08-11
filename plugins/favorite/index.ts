import express, { Request, Response } from "express";

const plugin = {
  register: async () => {
    const favoriteRouter = express.Router();

    await require('./model')();
    const routes = await require('./routes')(favoriteRouter)

    return favoriteRouter
  }
}

module.exports = plugin;