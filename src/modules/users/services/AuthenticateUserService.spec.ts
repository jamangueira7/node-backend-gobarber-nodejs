import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUser = new FakeUsersRepository();
        const fakeHash = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUser, fakeHash);
        const authenticateUser = new AuthenticateUserService(fakeUser, fakeHash);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user', async () => {
        const fakeUser = new FakeUsersRepository();
        const fakeHash = new FakeHashProvider();
        const authenticateUser = new AuthenticateUserService(fakeUser, fakeHash);

        await expect(authenticateUser.execute({
            email: 'john.doe@gamil.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to authenticate with wrong password', async () => {
        const fakeUser = new FakeUsersRepository();
        const fakeHash = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUser, fakeHash);
        const authenticateUser = new AuthenticateUserService(fakeUser, fakeHash);

        await createUser.execute({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        await expect(authenticateUser.execute({
            email: 'john.doe@gamil.com',
            password: 'wrog-password',
        })).rejects.toBeInstanceOf(AppError);
    });

});
