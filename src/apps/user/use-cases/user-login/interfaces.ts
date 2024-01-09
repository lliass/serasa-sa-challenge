import { IUseCase } from '../../../../shared/interfaces/use-case.interface';
import { UserLoginRequestDTO, UserLoginResponseDTO } from './login.dto';

interface IUserLoginUseCase extends IUseCase {
  execute(params: UserLoginRequestDTO): Promise<UserLoginResponseDTO>;
}

const USER_LOGIN_USE_CASE_TYPE = Symbol.for('IUserLoginUseCase');

export { IUserLoginUseCase, USER_LOGIN_USE_CASE_TYPE };
