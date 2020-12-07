import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUser: FakeUsersRepository;
let fakeHash: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUser = new FakeUsersRepository();
        fakeHash = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();

        createUser = new CreateUserService(
            fakeUser,
            fakeHash,
            fakeCacheProvider
        );
    });

    it('should be able to create a new user', async () => {

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });
    it('should not be able to create a new user with sema email from another', async () => {

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
