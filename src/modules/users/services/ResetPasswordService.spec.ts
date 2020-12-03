import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import AppError from '@shared/errors/AppError';

let fakeUser: FakeUsersRepository;
let fakeUserTokens: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUser = new FakeUsersRepository();
        fakeUserTokens = new FakeUserTokensRepository()

        resetPasswordService = new ResetPasswordService(
            fakeUser,
            fakeUserTokens,
        );
    });

    it('should be able to reset the password', async () => {
        const user =await fakeUser.create({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        const { token } = await fakeUserTokens.generate(user.id);

        await resetPasswordService.execute({
            password: '123123',
            token,
        });

        const updateUser = await fakeUser.findById(user.id);

        expect(updateUser?.password).toBe('123123');
    });

});
