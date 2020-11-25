import  path from 'path';
import fs  from 'fs';
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id, avatarFilename } : IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

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
        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
