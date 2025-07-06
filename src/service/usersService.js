import usersRepository from "../repository/usersRepository.js";
import { createToken } from "../middleware/authMiddleware.js";
import bcrypt from "bcryptjs";

class UsersService {
    static loginUserService = async(userData) => {
        const user = await usersRepository.getUserByEmail(userData.email);
        const isPasswordValid = await bcrypt.compare(userData.password, user.password);
        const token = createToken(user);
        if (!isPasswordValid) {
            throw new Error('Invalid password!');
        }
        return { user, token };
    }

    static registerUserService = async(userData) => {
        console.log("this is the new email ", userData.email)
        const existingUser = await usersRepository.getUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists!');
        }

        userData.password = await bcrypt.hash(userData.password, 10);
        const user = await usersRepository.registerUser(userData);
        const token = createToken(user);
        return { user, token };
    }

    static getUserByIdService = async(userId) => {
        return usersRepository.getUserById(userId);
    }

    static getUserByEmailService = async(email) => {
        return usersRepository.getUserByEmail(email);
    }
}

export default UsersService;
