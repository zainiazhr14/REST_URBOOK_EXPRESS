import { Request, Response } from "express";
import User from '../user/model/User';
import RESTful from '../../driver/database/postgresql/rest';

const JWT = require('jsonwebtoken');

const UserREST = new RESTful('user', 'User');
UserREST.populate = {
  path: ''
};

module.exports = (routes: any) => {
  // list
  routes.post('/sign-in', async (req: Request, res: Response) => {
    try {
      let { username, password } = req.body;
      username = username.toLowerCase();

      const userData = await User.findOne({
        where: {
          username
        },
        attributes: ['id', 'full_name', 'password', 'username', 'is_active']
      })

      if (!userData) {
        return res.status(404).send('User Not Found');
      }

      if (!userData.is_active) {
        return res.status(403).send('User Suspended');
      }

      const isMatch = userData.comparePassword(password);
      if (isMatch) {
        const token = JWT.sign(userData.toJSON(), process.env.JWT_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '2w' });

        delete req.body.email;
        delete req.body.password;
        req.params.id = userData.id;

        const { error, data } = await UserREST.get(req);

        if (error) {
          return res.status(400).send('Bad Request');
        }
        data.data.token = token;

        return res.status(200).send(data);
      }
      return res.status(404).send('Identity Not Match');
    } catch (e) {
      return res.status(500).send(e);
    }
  })
}