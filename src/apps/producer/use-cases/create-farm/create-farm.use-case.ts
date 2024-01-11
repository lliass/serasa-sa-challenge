import { ICreateFarmUseCase } from './interfaces';
import { inject, injectable } from 'inversify';
import {
  CreateFarmRequestParamDTO,
  CreateFarmRequestBodyDTO,
  CreateFarmResponseDTO,
} from './create-farm.dto';
import {
  IProducerRepository,
  PRODUCER_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/producer/Iproducer.repository';
import {
  IFarmRepository,
  FARM_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/farm/Ifarm.repository';

import { BadRequest, NotFound } from 'http-errors';

@injectable()
export default class CreateProducerUseCase implements ICreateFarmUseCase {
  @inject(PRODUCER_REPOSITORY_TYPE)
  private producerRepository: IProducerRepository;

  @inject(FARM_REPOSITORY_TYPE)
  private farmRepository: IFarmRepository;

  async execute(params: {
    param: CreateFarmRequestParamDTO;
    body: CreateFarmRequestBodyDTO;
  }): Promise<CreateFarmResponseDTO> {
    const {
      param: { id },
      body: {
        name,
        city,
        state,
        hectaresTotalArea,
        agriculturalTotalArea,
        vegetationTotalArea,
      },
    } = params;

    const producerFound = await this.producerRepository.findOne({ id: +id });

    if (!producerFound)
      throw new NotFound('No producer was found with this identifier');

    const totalOccupiedArea = agriculturalTotalArea + vegetationTotalArea;

    const totalOccupiedAreaIsGreaterThanHectaresTotalArea =
      totalOccupiedArea > hectaresTotalArea;

    if (totalOccupiedAreaIsGreaterThanHectaresTotalArea) {
      throw new BadRequest(
        'The total between agricultural area and vegetation area must not be greater than the total hectares of the farm',
      );
    }

    const newFarm = await this.farmRepository.saveOne({
      producer_id: +id,
      name,
      city,
      state,
      hectares_total_area: hectaresTotalArea,
      agricultural_total_area: agriculturalTotalArea,
      vegetation_total_area: vegetationTotalArea,
    });

    return {
      id: newFarm.id,
      producerId: newFarm.producer_id,
      name: newFarm.name,
      city: newFarm.city,
      state: newFarm.state,
      hectaresTotalArea: newFarm.hectares_total_area,
      agriculturalTotalArea: newFarm.agricultural_total_area,
      vegetationTotalArea: newFarm.vegetation_total_area,
    };
  }
}
