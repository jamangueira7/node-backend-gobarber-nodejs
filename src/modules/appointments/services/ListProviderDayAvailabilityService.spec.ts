import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({ provider_id, month, year } : IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id,
            month,
            year,
            day,
        });


        return availability;
    }
}

export default ListProviderDayAvailabilityService;
