import express, { Request, Response } from "express";

const plugin = {
  register: async () => {
    const authRouter = express.Router();

    const routes = await require('./routes')(authRouter)

    return authRouter
  }
}

module.exports = plugin;