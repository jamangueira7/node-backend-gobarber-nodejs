import { injectable, inject } from 'tsyringe';

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
        const appointment = await this.appointmentsRepository.findAllinMonthFromProvider({
            provider_id,
            month,
            year
        });

        console.log(appointment)
        return [{day: 1, available: false}];
    }
}

export default ListProviderMonthAvailabilityService;
