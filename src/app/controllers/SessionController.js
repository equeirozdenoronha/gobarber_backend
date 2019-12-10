import jwt from 'jsonwebtoken'
import User from '../models/user'

class SessionController {
    async store(req, res) {

        const { email, password } = req.body
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(401).json({ error: 'User not Found' })
        }
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Password does not match' })
        }

        const { id, name } = user;
        return res.json({
            user:
            {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, 'b3055f84d43ce2210a798ea1e76ae5e8', {
                expiresIn: '1d',
            })
        })
    }
}

export default new SessionController();