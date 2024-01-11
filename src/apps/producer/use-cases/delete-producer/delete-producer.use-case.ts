import { IDeleteProducerUseCase } from './interfaces';
import { inject, injectable } from 'inversify';
import { DeleteProducerRequestDTO } from './delete-producer.dto';
import {
  IProducerRepository,
  PRODUCER_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/producer/Iproducer.repository';
import {
  IPlantedCropRepository,
  PLANTED_CROP_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/planted-crop/Iplanted-crop.repository';
import {
  IFarmRepository,
  FARM_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/farm/Ifarm.repository';
import { NotFound } from 'http-errors';

@injectable()
export default class DeleteProducerUseCase implements IDeleteProducerUseCase {
  @inject(PRODUCER_REPOSITORY_TYPE)
  private producerRepository: IProducerRepository;

  @inject(PLANTED_CROP_REPOSITORY_TYPE)
  private plantedCropRepository: IPlantedCropRepository;

  @inject(FARM_REPOSITORY_TYPE)
  private farmRepository: IFarmRepository;

  async execute(params: DeleteProducerRequestDTO): Promise<void> {
    const { id } = params;

    const producerFound = await this.producerRepository.findOne({
      id: +id,
    });

    if (!producerFound)
      throw new NotFound('No producer was found with this identifier');

    const allFarms = await this.farmRepository.findMany({ producer_id: +id });

    if (allFarms.length) {
      const allFarmIds = allFarms.map((farm) => farm.id);

      const allPlantedCrops =
        await this.plantedCropRepository.findManyByFarmIds({
          farmIds: allFarmIds,
        });

      if (allPlantedCrops.length) {
        const allPlantedCropsIds = allPlantedCrops.map((farm) => farm.id);
        await this.plantedCropRepository.deleteMany({
          ids: allPlantedCropsIds,
        });
      }

      await this.farmRepository.deleteMany({ ids: allFarmIds });
    }

    await this.producerRepository.deleteOne({ id: +id });
  }
}
