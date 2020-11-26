import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointment = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointment,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123123');
    });

    it('should not be able to create two appointment on the same time', async () => {
        const fakeAppointment = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointment,
        );

        const appointmentDate = new Date(2002,4, 11);
        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123123',
        });

        expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123123',
        })).rejects.toBeInstanceOf(AppError);
    });
});
