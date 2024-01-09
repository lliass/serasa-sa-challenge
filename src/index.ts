import Application from './application';
import { PostgresDataSource } from './infrastructure/persistence/postgres/data-source';

const application = new Application();

PostgresDataSource.initialize()
  .then(async () => {
    console.log({
      message: 'Postgres for api has been initialized',
    });

    application.start();
  })
  .catch((error) =>
    console.error({
      errorMessage: 'An error on initialization of api application',
      errorStack: error,
    }),
  );
