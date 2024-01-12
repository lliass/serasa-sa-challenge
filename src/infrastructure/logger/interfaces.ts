interface ILoggerInfra {
  currentDate(): void;
  error(params: { errorMessage: string; errorStack: any }): void;
  dynamicMessage(params: { message: string }): void;
}

const LOGGER_INFRA_TYPE = Symbol.for('ILoggerInfra');

export { ILoggerInfra, LOGGER_INFRA_TYPE };
