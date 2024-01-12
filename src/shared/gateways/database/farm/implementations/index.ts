import container from '../../../../../config/inversify.config';
import { IFarmRepository, FARM_REPOSITORY_TYPE } from '../Ifarm.repository';

const farmRepository = container.get<IFarmRepository>(FARM_REPOSITORY_TYPE);

export { farmRepository };
