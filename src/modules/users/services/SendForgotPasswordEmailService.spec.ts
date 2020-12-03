import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using the email', async () => {
        const fakeUser = new FakeUsersRepository();
        const fakeMail = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMail, 'sendMail');

        const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeUser,
            fakeMail,
        );

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
});
