import { IsNotEmpty, IsNumberString } from 'class-validator';

class ListProducerRequestDTO {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}

class ListProducerResponseDTO {
  id: number;
  cpf: string;
  cnpj?: string;
  name: string;
}

export { ListProducerRequestDTO, ListProducerResponseDTO };
