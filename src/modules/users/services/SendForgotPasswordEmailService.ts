import { injectable, inject } from 'tsyringe';
import UsersRepository from '@modules/users/infra/http/repositories/UsersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";


interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({ email } : IRequest): Promise<void> {
        this.mailProvider.sendMail(
            email,
            'Pedido de recuperação de senha recebido',
        );
    }
}

export default SendForgotPasswordEmailService;
