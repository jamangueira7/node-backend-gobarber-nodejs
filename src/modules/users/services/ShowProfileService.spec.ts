import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUser: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUser = new FakeUsersRepository();

        showProfile = new ShowProfileService(
            fakeUser,
        );
    });

    it('should be able to show profile', async () => {

        const user = await fakeUser.create({
            name: 'John Doe',
            email: 'john.doe@gamil.com',
            password: '123456',
        });

        const profile = await showProfile.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('John Doe');
        expect(profile.email).toBe('john.doe@gamil.com');
    });

    it('should not be able to show profile from non-existing user', async () => {

        await expect(
            showProfile.execute({
                user_id: 'non-existing-user',
            })
        ).rejects.toBeInstanceOf(AppError);

    });


});
