import container from '../../../../config/inversify.config';
import UserLoginController from './login.controller';

const userLoginController =
  container.get<UserLoginController>(UserLoginController);

export { userLoginController };
