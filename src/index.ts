import Application from './application';
import { PostgresDataSource } from './infrastructure/persistence/postgres/data-source';
import { loggerInfra } from './infrastructure/logger/index';

const application = new Application();

PostgresDataSource.initialize()
  .then(async () => {
    loggerInfra.dynamicMessage({
      message: 'Postgres for api has been initialized',
    });

    application.start();
  })
  .catch((error) =>
    loggerInfra.error({
      errorMessage: 'An error on initialization of api application',
      errorStack: error,
    }),
  );
