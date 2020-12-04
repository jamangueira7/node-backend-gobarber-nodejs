import { uuid } from 'uuidv4'
import { isEqual, getMonth, getYear } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentIDTO from '@modules/appointments/dtos/ICreateAppointmentIDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment [] = [];

    public async findByDate(date: Date) : Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment => isEqual(appointment.date, date),
        )

        return findAppointment;
    }

    public async findAllinMonthFromProvider({
        provider_id,
        month,
        year
    }: IFindAllInMonthFromProviderDTO) : Promise<Appointment[]> {

        const appointment = this.appointments.filter(appointment =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date)+1 === month &&
                getYear(appointment.date) === year

        );

        return appointment;
    }

    public async create({ provider_id, date } : ICreateAppointmentIDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointments.push(appointment);

        return appointment;
    }

}

export default FakeAppointmentsRepository;
