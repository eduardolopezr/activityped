import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'servicea',
  connector: 'rest',
  baseURL: 'https://microservice-a.herokuapp.com/',
  crud: false,
  options:{
    headers:{
      accept:'aplication/json',
      'content-type':'aplication/json',
    }
  },
  operations:[
    {
      template:{
        method:"GET",
        url:"https://microservice-a.herokuapp.com/getprice/{postalcode}"
      },
      functions:{
        getprice:["postalcode"]
      }
    }
  ]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ServiceaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'servicea';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.servicea', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
