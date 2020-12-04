import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({ provider_id, month, year } : IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
            provider_id,
            month,
            year
        });

        const numberOfDayInMonth = getDaysInMonth(new Date(year, month -1));

        const eachDayArray = Array.from(
            {length: numberOfDayInMonth },
            (_, index) => index + 1,
        );

        const availability = eachDayArray.map( day => {
           const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
           });

           return {
               day,
               available: appointmentsInDay.length < 10,
           };
        });

        console.log(availability)

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;
