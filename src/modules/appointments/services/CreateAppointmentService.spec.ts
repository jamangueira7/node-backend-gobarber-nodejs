import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointment: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointment = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointment,
        );
    });

    it('should be able to create a new appointment', async () => {


        const appointment = await createAppointment.execute({
            date: new Date(),
            user_id: '1234785',
            provider_id: '123123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123123');
    });

    it('should not be able to create two appointment on the same time', async () => {

        const appointmentDate = new Date(2002,4, 11);
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
});
