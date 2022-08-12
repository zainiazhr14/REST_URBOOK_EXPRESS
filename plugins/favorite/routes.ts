import { Request, Response } from "express";
import RESTful from '../../driver/database/postgresql/rest';


const FavoriteREST = new RESTful('favorite', 'Favorite');
FavoriteREST.populate = {
  path: ''
};

module.exports = (routes: any) => {
  // list
  routes.get('/', async (req: Request, res: Response) => {
    try {
      const { error, data } = await FavoriteREST.list(req);
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
      const { error, data } = await FavoriteREST.get(req);
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
      const { error, data } = await FavoriteREST.create(req);
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
      const { error, data } = await FavoriteREST.update(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  })

  // Delete
  routes.delete('/:id', async (req: Request, res: Response) => {
    try {
      const { error, data } = await FavoriteREST.remove(req);
      if (error) {
        return res.status(400).send('Bad Request');
      }

      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  })
}