import { json } from 'express';

const expressJson = json();

export interface ApplicationConfigurations {
  corsSpecification: {
    origin: string[];
  };
  defaultCommunication: typeof expressJson;
  prefix: string;
}

export interface IApplication {
  start(): void;
}
