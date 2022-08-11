import jwt from 'jsonwebtoken'
import { noSecurePath, filePath, uploadPath } from '../config/setting'
const accessTokenSecret = process.env.JWT_TOKEN_SECRET

const checkAuth = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    const pathSplit = req.path.split('/').filter((item: string) => item !== '');

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else if (noSecurePath.includes(req.path)) {
        next()
    } else if (pathSplit[0] == filePath && pathSplit[1] == uploadPath && filePath.length > 2) {
        next()
    } else {
        res.sendStatus(401);
    }
}

export default checkAuth