import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUser: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUser = new FakeUsersRepository();

        listProviders = new ListProvidersService(
            fakeUser,
        );
    });

    it('should be able to list the providers', async () => {

        const user1 = await fakeUser.create({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        const user2 = await fakeUser.create({
            name: 'John Tre',
            email: 'john.tre@gamil.com',
            password: '123456',
        });

        const loggerUser = await fakeUser.create({
            name: 'John Qua',
            email: 'john.qua@gamil.com',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggerUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });




});
