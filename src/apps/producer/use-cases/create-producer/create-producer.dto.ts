import { IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';

class CreateProducerRequestDTO {
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'Invalid CPF format',
  })
  @IsNotEmpty()
  cpf: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'Invalid CNPJ format',
  })
  cnpj?: string;

  @IsNotEmpty()
  name: string;
}

export { CreateProducerRequestDTO };
