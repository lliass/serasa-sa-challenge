import { IRegisterUserUseCase } from './interfaces';
import { inject, injectable } from 'inversify';
import { PostRegisterUserRequestDTO } from './register-user.dto';
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

@injectable()
export default class RegisterUserUseCase implements IRegisterUserUseCase {
  specifications = {
    allowedEmailDomains: [...authVariables.allowedEmailDomains.split(',')],
  };

  @inject(USER_REPOSITORY_TYPE)
  private userRepository: IUserRepository;

  @inject(CRYPTO_INFRA_TYPE)
  private cryptoInfra: ICryptoInfra;

  async execute(params: PostRegisterUserRequestDTO): Promise<void> {
    const { email, password } = params;

    const { allowedEmailDomains } = this.specifications;

    const emailDomain = email.split('@')[1];

    const emailDomainIsNotAllowed = !allowedEmailDomains.includes(emailDomain);

    if (emailDomainIsNotAllowed)
      throw new BadRequest('Email domain is not allowed');

    const userFound = await this.userRepository.findOne({ email });

    if (!!userFound) throw new BadRequest('Email already registered');

    const encryptedPassword = await this.cryptoInfra.encryptPassword({
      password,
    });

    await this.userRepository.saveOne({
      email,
      password: encryptedPassword,
      blocked: false,
      attempts: 0,
    });
  }
}
