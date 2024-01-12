import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsNumberString,
  IsPositive,
} from 'class-validator';

class CreateCropRequestParamDTO {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}

class CreateCropRequestBodyDTO {
  @IsString()
  @IsNotEmpty()
  cropName: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  totalAreaToPlant: number;
}

class CreateCropResponseDTO {
  cropId: number;
  farmId: number;
  cropTypeId: number;
  totalPlantedArea: number;
}

export {
  CreateCropRequestParamDTO,
  CreateCropRequestBodyDTO,
  CreateCropResponseDTO,
};
