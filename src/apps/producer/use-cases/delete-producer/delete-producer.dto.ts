import { IsNotEmpty, IsNumberString } from 'class-validator';

class DeleteProducerRequestDTO {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}

export { DeleteProducerRequestDTO };
