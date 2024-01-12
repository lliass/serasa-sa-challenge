import { IListFarmsUseCase } from './interfaces';
import { inject, injectable } from 'inversify';
import { ListFarmsResponseDTO } from './list-farms.dto';
import {
  IFarmRepository,
  FARM_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/farm/Ifarm.repository';
import { NotFound } from 'http-errors';

@injectable()
export default class ListFarmsUseCase implements IListFarmsUseCase {
  @inject(FARM_REPOSITORY_TYPE)
  private farmRepository: IFarmRepository;

  async execute(): Promise<ListFarmsResponseDTO[]> {
    const allFarms = await this.farmRepository.findAll();

    if (!allFarms.length) {
      throw new NotFound('No farms was found');
    }

    const result = allFarms.map<ListFarmsResponseDTO>((farmInformation) => {
      const farmReturn: ListFarmsResponseDTO = {
        id: farmInformation.id,
        producerId: farmInformation.producer_id,
        name: farmInformation.name,
        city: farmInformation.state,
        state: farmInformation.state,
        hectaresTotalArea: farmInformation.hectares_total_area,
        agriculturalTotalArea: farmInformation.agricultural_total_area,
        vegetationTotalArea: farmInformation.vegetation_total_area,
      };

      farmReturn.plantedCrops = !!farmInformation.plantedCrops
        ? farmInformation.plantedCrops?.map((plantedCrop) => {
            return {
              name: plantedCrop.cropType?.name,
              description: plantedCrop.cropType?.description,
              totalPlantedArea: plantedCrop.total_planted_area,
            };
          })
        : [];

      return farmReturn;
    });

    return result;
  }
}
