import { IsNotEmpty, IsEmail } from 'class-validator';

class UserLoginRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

interface UserLoginResponseDTO {
  token: string;
}

export { UserLoginRequestDTO, UserLoginResponseDTO };
