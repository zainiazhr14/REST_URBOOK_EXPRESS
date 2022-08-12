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
  title: Joi.string().required(),
  writer_id: Joi.string().required(),
  cover: Joi.string().required(),
  description: Joi.string().required(),
  total_page: Joi.number().required(),
  rate: Joi.number().required(),
  genre: Joi.array().items(Joi.string()),
})


const BookREST = new RESTful('book', 'Book');
BookREST.populate = {
  path: ''
};

module.exports = (routes: any) => {
  // list
  routes.get('/', validator.query(querySchemaGlobal), async (req: Request, res: Response) => {
    try {
      const { error, data } = await BookREST.list(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  })

  // Get One
  routes.get('/:id', validator.query(querySchemaGlobal), validator.params(paramsIdSchema), async (req: Request, res: Response) => {
    try {
      const { error, data } = await BookREST.get(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  })

  // Create
  routes.post('/', validator.body(payloadSchema), async (req: Request, res: Response) => {
    try {
      const { error, data } = await BookREST.create(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  })

  // Update
  routes.put('/:id', validator.body(payloadSchema), validator.params(paramsIdSchema), async (req: Request, res: Response) => {
    try {
      const { error, data } = await BookREST.update(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  })


  // Delete
  routes.delete('/:id', validator.params(paramsIdSchema), async (req: Request, res: Response) => {
    try {
      const { error, data } = await BookREST.remove(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  })
}