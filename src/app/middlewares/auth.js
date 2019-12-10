import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth';
import { promisify } from 'util';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const token_decoded = await promisify(jwt.verify)(token, authConfig.secret);
        req.user_id = token_decoded.id
        return next()
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ error: "Not Authorized" })
    }
};