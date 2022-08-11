import { Request, Response } from "express";
import RESTful from '../../driver/database/postgresql/rest';

const UserREST = new RESTful('user', 'User');
UserREST.populate = {
  path: ''
};

module.exports = (routes: any) => {
  // list
  routes.get('/', async (req: Request, res: Response) => {
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
  routes.get('/:id', async (req: Request, res: Response) => {
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

  // Remove
  routes.delete('/:id', async (req: Request, res: Response) => {
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
}