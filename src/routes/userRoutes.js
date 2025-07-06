import UserController from "../controller/usersController.js";
import express from 'express';

const router = express.Router();

router.post('/loginUser', UserController.loginUserController)
router.post('/registerUser', UserController.registerUserController)
router.get('/getUserById/:uid', UserController.getUserByIdController)
router.get('/getUserByEmail', UserController.getUserByEmailController)

export default router;