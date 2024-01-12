class ListFarmsResponseDTO {
  id: number;
  producerId: number;
  name: string;
  city: string;
  state: string;
  hectaresTotalArea: number;
  agriculturalTotalArea: number;
  vegetationTotalArea: number;
  plantedCrops?: PlantedCrops[] | [];
}

class PlantedCrops {
  name?: string;
  description?: string;
  totalPlantedArea?: number;
}

export { ListFarmsResponseDTO };
