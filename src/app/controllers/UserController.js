import User from '../models/user'
import * as Yup from 'yup'

class UserController {
    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fields failed." })
        }
        const userExists = await User.findOne({ where: { email: req.body.email } });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const { id, name, email, provider } = await User.create(req.body);

        return res.json({ id, name, email, provider });
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
                oldPassword ? field.required() : field
            )
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fields failed." })
        }

        const { email, oldPassword } = req.body;
        const user = await User.findByPk(req.user_id);
        console.log(user)
        if (email !== user.email) {
            const userExists = await User.findOne({ where: { email } });

            if (userExists) {
                return res.status(400).json({ error: 'User already exists' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not Match!' })
        }

        const { id, name, provider } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            provider,
        });

    }

    // async index(req, res) {
    //     console.log(req.headers)
    //     const users = await User.find()

    //     if (!users) {
    //         return res.send(422).json({ "message": "Don't have users yet." })
    //     }

    //     return res.json(users)

    // }
}

export default new UserController();