import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ServiceaDataSource} from '../datasources';

export interface Servicea {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getpirce(postalcode: string): Promise<object>;
}

export class ServiceaProvider implements Provider<Servicea> {
  constructor(
    // servicea must match the name property in the datasource json file
    @inject('datasources.servicea')
    protected dataSource: ServiceaDataSource = new ServiceaDataSource(),
  ) {}

  value(): Promise<Servicea> {
    return getService(this.dataSource);
  }
}
