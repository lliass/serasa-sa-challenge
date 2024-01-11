import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsNumberString,
  IsPositive,
} from 'class-validator';

class CreateFarmRequestParamDTO {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}

class CreateFarmRequestBodyDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  hectaresTotalArea: number;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  agriculturalTotalArea: number;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  vegetationTotalArea: number;
}

class CreateFarmResponseDTO {
  id: number;
  producerId: number;
  name: string;
  city: string;
  state: string;
  hectaresTotalArea: number;
  agriculturalTotalArea: number;
  vegetationTotalArea: number;
}

export {
  CreateFarmRequestParamDTO,
  CreateFarmRequestBodyDTO,
  CreateFarmResponseDTO,
};
