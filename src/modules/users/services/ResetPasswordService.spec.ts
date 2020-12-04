import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

let fakeUser: FakeUsersRepository;
let fakeUserTokens: FakeUserTokensRepository;
let fakeHash: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakeUser = new FakeUsersRepository();
        fakeUserTokens = new FakeUserTokensRepository()
        fakeHash = new FakeHashProvider();

        resetPasswordService = new ResetPasswordService(
            fakeUser,
            fakeUserTokens,
            fakeHash,
        );
    });

    it('should be able to reset the password', async () => {
        const user =await fakeUser.create({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        const { token } = await fakeUserTokens.generate(user.id);

        const generateHash = jest.spyOn(fakeHash, 'generateHash');

        await resetPasswordService.execute({
            password: '123123',
            token,
        });

        const updateUser = await fakeUser.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updateUser?.password).toBe('123123');
    });

    it('should not be able to reset the password with non-existing token', async () => {
        await expect(
            resetPasswordService.execute({
                token: 'non-existing-token',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password with non-existing user', async () => {
        const { token }  = await fakeUserTokens.generate('non-existing-user');

        await expect(
            resetPasswordService.execute({
                token,
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password if passed more then 2 hours', async () => {
        const user =await fakeUser.create({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        const { token } = await fakeUserTokens.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPasswordService.execute({
                token,
                password: '123123',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});
