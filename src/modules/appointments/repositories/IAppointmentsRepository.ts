import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import ICreateAppointmentIDTO from '@modules/appointments/dtos/ICreateAppointmentIDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentIDTO ): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findAllinMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>;
}
