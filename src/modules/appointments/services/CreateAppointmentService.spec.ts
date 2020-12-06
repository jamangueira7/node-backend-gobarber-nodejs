import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository
    from '@modules/notifications/infra/typeorm/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointment: FakeAppointmentsRepository;
let fakeNotification: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointment = new FakeAppointmentsRepository();
        fakeNotification = new FakeNotificationsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointment, fakeNotification
        );
    });

    it('should be able to create a new appointment', async () => {

        jest.spyOn( Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 13).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10,14),
            user_id: '1234785',
            provider_id: '123123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123123');
    });

    it('should not be able to create two appointment on the same time', async () => {

        jest.spyOn( Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 13).getTime();
        });

        const appointmentDate = new Date(2020,4, 12, 14);
        await createAppointment.execute({
            date: appointmentDate,
            user_id: '1234785',
            provider_id: '123123123',
        });

        await expect(createAppointment.execute({
            date: appointmentDate,
            user_id: '1234785',
            provider_id: '123123123',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on the same date', async () => {

        jest.spyOn( Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 10, 11),
            user_id: '1234785',
            provider_id: '123123123',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment with same user as provider', async () => {

        jest.spyOn( Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: '123123123',
            provider_id: '123123123',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment before 8am and after 5pm', async () => {

        jest.spyOn( Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 20, 7),
            user_id: '321654',
            provider_id: '123123123',
        })).rejects.toBeInstanceOf(AppError);

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 20, 18),
            user_id: '321654',
            provider_id: '123123123',
        })).rejects.toBeInstanceOf(AppError);
    });
});
