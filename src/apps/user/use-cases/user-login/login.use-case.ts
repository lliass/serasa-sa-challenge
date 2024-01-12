import { IUserLoginUseCase } from './interfaces';
import { inject, injectable } from 'inversify';
import { authVariables } from '../../../../config/variables.config';
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/user/Iuser.repository';
import {
  CRYPTO_INFRA_TYPE,
  ICryptoInfra,
} from '../../../../infrastructure/crypto/Icrypto.infra';
import { BadRequest } from 'http-errors';
import { UserLoginRequestDTO, UserLoginResponseDTO } from './login.dto';
import { cloneDeep, omit } from 'lodash';
import jwt from 'jsonwebtoken';

@injectable()
export default class UserLoginUseCase implements IUserLoginUseCase {
  specifications = {
    limitOfAttempts: 5,
  };

  @inject(USER_REPOSITORY_TYPE)
  private userRepository: IUserRepository;

  @inject(CRYPTO_INFRA_TYPE)
  private cryptoInfra: ICryptoInfra;

  async execute(params: UserLoginRequestDTO): Promise<UserLoginResponseDTO> {
    const { email, password } = params;

    const userFound = await this.userRepository.findOne({ email });

    if (!userFound) throw new BadRequest('User not found');

    const userIsBlocked = userFound.blocked;

    if (userIsBlocked) throw new BadRequest('User is blocked');

    const passwordIsNotCorrect =
      !(await this.cryptoInfra.validateEncryptedPassword({
        forwardedPassword: password,
        encryptedPassword: userFound.password,
      }));

    if (passwordIsNotCorrect) {
      const userClone = cloneDeep(userFound);

      userClone.attempts < this.specifications.limitOfAttempts
        ? userClone.attempts++
        : (userClone.blocked = true);

      await this.userRepository.updateOne({
        id: userFound.id,
        payload: omit(userClone, ['id']),
      });

      throw new BadRequest('Credentials are incorrect');
    }

    const jwtPayload: Record<string, string> = {
      email: userFound.email,
    };

    const token = jwt.sign(jwtPayload, authVariables.jwtSecretKey, {
      expiresIn: '12h',
    });

    return { token };
  }
}
