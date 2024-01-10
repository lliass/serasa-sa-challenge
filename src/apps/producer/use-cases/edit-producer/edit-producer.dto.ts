import {
  IsOptional,
  IsString,
  Matches,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

class EditProducerRequestParamDTO {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}

class EditProducerRequestBodyDTO {
  @IsOptional()
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'Invalid CPF format',
  })
  cpf?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'Invalid CNPJ format',
  })
  cnpj?: string;

  @IsNotEmpty()
  name: string;
}

export { EditProducerRequestParamDTO, EditProducerRequestBodyDTO };
