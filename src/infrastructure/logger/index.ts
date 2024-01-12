import container from '../../config/inversify.config';
import { ILoggerInfra, LOGGER_INFRA_TYPE } from './interfaces';

const loggerInfra = container.get<ILoggerInfra>(LOGGER_INFRA_TYPE);

export { loggerInfra };
