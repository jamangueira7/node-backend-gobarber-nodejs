import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUser = new FakeUsersRepository();
        const fakeHash = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUser, fakeHash,
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });
    it('should not be able to create a new user with sema email from another', async () => {
        const fakeUser = new FakeUsersRepository();
        const fakeHash = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUser, fakeHash,
        );

       await createUser.execute({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        await expect(createUser.execute({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);
    });
});
