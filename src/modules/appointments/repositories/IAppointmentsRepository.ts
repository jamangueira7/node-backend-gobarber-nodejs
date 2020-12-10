import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentIDTO from '@modules/appointments/dtos/ICreateAppointmentIDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentIDTO ): Promise<Appointment>;
    findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>;
    findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>;
}
