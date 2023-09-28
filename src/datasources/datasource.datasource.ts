import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'datasource',
  connector: 'mongodb',
  url: 'mongodb://127.0.0.1:27017/todo',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'todo',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DatasourceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'datasource';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.datasource', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
