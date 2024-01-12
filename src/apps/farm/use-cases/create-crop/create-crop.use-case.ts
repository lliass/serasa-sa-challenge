import { ICreateCropUseCase } from './interfaces';
import { inject, injectable } from 'inversify';
import {
  CreateCropRequestParamDTO,
  CreateCropRequestBodyDTO,
  CreateCropResponseDTO,
} from './create-crop.dto';
import {
  IFarmRepository,
  FARM_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/farm/Ifarm.repository';
import {
  ICropTypeRepository,
  CROP_TYPE_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/crop-type/Icrop-type.repository';
import {
  IPlantedCropRepository,
  PLANTED_CROP_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/planted-crop/Iplanted-crop.repository';

import { NotFound, BadRequest } from 'http-errors';

@injectable()
export default class CreateCropUseCase implements ICreateCropUseCase {
  @inject(FARM_REPOSITORY_TYPE)
  private farmRepository: IFarmRepository;

  @inject(CROP_TYPE_REPOSITORY_TYPE)
  private cropTypeRepository: ICropTypeRepository;

  @inject(PLANTED_CROP_REPOSITORY_TYPE)
  private plantedCropRepository: IPlantedCropRepository;

  async execute(params: {
    param: CreateCropRequestParamDTO;
    body: CreateCropRequestBodyDTO;
  }): Promise<CreateCropResponseDTO> {
    const {
      param: { id },
      body: { cropName, totalAreaToPlant },
    } = params;

    const farmFound = await this.farmRepository.findOne({
      id: +id,
    });

    if (!farmFound)
      throw new NotFound('No farm was found with this identifier');

    const cropFound = await this.cropTypeRepository.findOne({
      name: cropName,
    });

    if (!cropFound) throw new NotFound('No crop was found with this name');

    const plantedCrops = await this.plantedCropRepository.findMany({
      farm_id: +id,
    });

    const sumOfAreaAlreadyPlantedOnTheFarm = plantedCrops.length
      ? plantedCrops.reduce(
          (total, currentValue) => total + currentValue.total_planted_area,
          0,
        )
      : 0;

    const limitOfAreaAvailableForPlantingHasExceeded =
      sumOfAreaAlreadyPlantedOnTheFarm + totalAreaToPlant >
      farmFound.agricultural_total_area;

    if (limitOfAreaAvailableForPlantingHasExceeded) {
      throw new BadRequest(
        'The limit of area available for planting has exceeded',
      );
    }

    const newPlantedCrop = await this.plantedCropRepository.saveOne({
      farm_id: +id,
      crop_type_id: cropFound.id,
      total_planted_area: totalAreaToPlant,
    });

    return {
      cropId: newPlantedCrop.id,
      farmId: newPlantedCrop.farm_id,
      cropTypeId: newPlantedCrop.crop_type_id,
      totalPlantedArea: newPlantedCrop.total_planted_area,
    };
  }
}
