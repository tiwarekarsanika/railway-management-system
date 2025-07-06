import UsersService from "../service/usersService.js";

class UserController {
    static loginUserController = async(req, res) => {
        try {
            const user = await UsersService.loginUserService(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static registerUserController = async(req, res) => {
        try {
            const user = await UsersService.registerUserService(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static getUserByIdController = async(req, res) => {
        try {
            const user = await UsersService.getUserByIdService(req.params.uid);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static getUserByEmailController = async(req, res) => {
        try {
            const user = await UsersService.getUserByEmailService(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default UserController;