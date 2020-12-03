import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

let fakeUser: FakeUsersRepository;
let fakeMail: FakeMailProvider;
let fakeUserTokens: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUser = new FakeUsersRepository();
        fakeMail = new FakeMailProvider();
        fakeUserTokens = new FakeUserTokensRepository()

        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeUser,
            fakeMail,
            fakeUserTokens,
        );
    });

    it('should be able to recover the password using the email', async () => {

        const sendMail = jest.spyOn(fakeMail, 'sendMail');

        await fakeUser.create({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        await sendForgotPasswordEmailService.execute({
            email: 'john.doe@gamil.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a not-existing user password', async () => {
        await expect(
            sendForgotPasswordEmailService.execute({
                email: 'john.doe@gamil.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokens, 'generate');

        const user = await fakeUser.create({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        await sendForgotPasswordEmailService.execute({
            email: 'john.doe@gamil.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
