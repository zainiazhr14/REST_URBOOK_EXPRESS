import { Request, Response } from "express";
import RESTful from '../../driver/database/postgresql/rest';


const WriterREST = new RESTful('writer', 'Writer');
WriterREST.populate = {
  path: ''
};

module.exports = (routes: any) => {
  // list
  routes.get('/', async (req: Request, res: Response) => {
    try {
      const { error, data } = await WriterREST.list(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  })

  // Get One
  routes.get('/:id', async (req: Request, res: Response) => {
    try {
      const { error, data } = await WriterREST.get(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  })

  // Create
  routes.post('/', async (req: Request, res: Response) => {
    try {
      const { error, data } = await WriterREST.create(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  })

  // Update
  routes.put('/:id', async (req: Request, res: Response) => {
    try {
      const { error, data } = await WriterREST.update(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  })

  routes.delete('/:id', async (req: Request, res: Response) => {
    try {
      const { error, data } = await WriterREST.remove(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  })
}