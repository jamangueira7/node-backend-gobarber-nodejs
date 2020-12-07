import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUser: FakeUsersRepository;
let fakeHash: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUser = new FakeUsersRepository();
        fakeHash = new FakeHashProvider();
        authenticateUser = new AuthenticateUserService(fakeUser, fakeHash);
    })
    it('should be able to authenticate', async () => {

        const user = await fakeUser.create({
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

        await expect(authenticateUser.execute({
            email: 'john.doe@gamil.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to authenticate with wrong password', async () => {

        await fakeUser.create({
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
