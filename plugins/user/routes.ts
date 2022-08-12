import { Request, Response } from "express";
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator
} from 'express-joi-validation';
import * as Joi from 'joi';
import RESTful from '../../driver/database/postgresql/rest';
import User from "./model/User";

const validator = createValidator()


const querySchemaGlobal = Joi.object({
  q: Joi.string(),
  search: Joi.string(),
  populate: Joi.string(),
  limit: Joi.string(),
  page: Joi.string(),
  sort: Joi.string(),
})

const paramsIdSchema = Joi.object({
  id: Joi.string().required()
})

const payloadSchema = Joi.object({
  full_name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().optional(),
  role: Joi.string().optional(),
  is_active: Joi.boolean().required(),
  profile: Joi.string().required()
})


const UserREST = new RESTful('user', 'User');
UserREST.populate = {
  path: ''
};

module.exports = (routes: any) => {
  // list
  routes.get('/', validator.query(querySchemaGlobal), async (req: Request, res: Response) => {
    try {
      const { error, data } = await UserREST.list(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      res.status(200).send(data);
    } catch (e) {
      res.status(500).send(e);
    }
  })

  // get
  routes.get('/:id', validator.query(querySchemaGlobal), validator.params(paramsIdSchema), async (req: Request, res: Response) => {
    try {
      const { error, data } = await UserREST.get(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      res.status(200).send(data);
    } catch (e) {
      res.status(500).send(e);
    }
  })

  // Create
  routes.post('/', validator.body(payloadSchema), async (req: Request, res: Response) => {
    try {
      const { error, data } = await UserREST.create(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      res.status(200).send(data);
    } catch (e) {
      res.status(500).send(e);
    }
  })

  // Update
  routes.put('/:id', validator.body(payloadSchema), validator.params(paramsIdSchema), async (req: Request, res: Response) => {
    try {
      const { error, data } = await UserREST.update(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      res.status(200).send(data);
    } catch (e) {
      res.status(500).send(e);
    }
  })

  // Remove
  routes.delete('/:id', validator.params(paramsIdSchema), async (req: Request, res: Response) => {
    try {
      const { error, data } = await UserREST.remove(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      res.status(200).send(data);
    } catch (e) {
      res.status(500).send(e);
    }
  })

  routes.post('/status/:id', async (req: Request, res: Response) => {
    try {
      const data = await User.findOne({
        where: {
          id: req.params.id
        }
      })

      
      if (!data) {
        return res.status(404).send('Data Not Found')
      }

      data.is_active = req.body.status
      data.save()
      
      return res.status(200).send(data)
    } catch (e) {
      res.status(500).send(e);
    }
  })
}