import usersRepository from "../repository/usersRepository.js";
import bcrypt from "bcryptjs";

class UsersService {
    static loginUserService = async(userData) => {
        const user = await usersRepository.getUserByEmail(userData.email);
        const isPasswordValid = await bcrypt.compare(userData.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password!');
        }
        return user
    }

    static registerUserService = async(userData) => {
        const existingUser = await usersRepository.getUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists!');
        }

        userData.password = await bcrypt.hash(userData.password, 10);
        return usersRepository.registerUser(userData);
    }

    static getUserByIdService = async(userId) => {
        return usersRepository.getUserById(userId);
    }

    static getUserByEmailService = async(email) => {
        return usersRepository.getUserByEmail(email);
    }
}

export default new UsersService();
