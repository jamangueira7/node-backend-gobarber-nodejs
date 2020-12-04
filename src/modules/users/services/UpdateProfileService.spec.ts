import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUser: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider();
        fakeUser = new FakeUsersRepository();

        updateProfile = new UpdateProfileService(
            fakeUser, fakeHashProvider,
        );
    });

    it('should be able to update profile', async () => {

        const user = await fakeUser.create({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        const updateUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'john.tre@gamil.com',
        });

        expect(updateUser.name).toBe('John Tre');
        expect(updateUser.email).toBe('john.tre@gamil.com');
    });

    it('should be able to change to another user email', async () => {

        await fakeUser.create({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        const user = await fakeUser.create({
            name: 'John Tre',
            email: 'john.tre@gamil.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Qua',
                email: 'john.doe@gamil.com',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {

        const user = await fakeUser.create({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        const updateUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'john.tre@gamil.com',
            password: '123123',
            old_password: '123456'
        });

        expect(updateUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {

        const user = await fakeUser.create({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Tre',
                email: 'john.tre@gamil.com',
                password: '123123',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {

        const user = await fakeUser.create({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Tre',
                email: 'john.tre@gamil.com',
                old_password: 'wrong-old-password',
                password: '123123',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
