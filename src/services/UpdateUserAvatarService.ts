import { getRepository } from "typeorm";
import  path from 'path';
import fs  from 'fs';
import uploadConfig from "../config/upload";

import User from "../models/User";
import AppError from "../errors/AppError";

interface Request {
    user_id: string;
    avatarFilename: string;
}


class UpdateUserAvatarService {

    public async execute({ user_id, avatarFilename } : Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if(!user) {
            throw new AppError('Only authenticated users con change avatar.', 401);
        }

        //deletar avatar caso já exista
        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directiory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
           if(userAvatarFileExists) {
               await fs.promises.unlink(userAvatarFilePath);
           }
        }

        //trocar o valor do avatar
        user.avatar = avatarFilename;
        //atualizar o usuario
        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
