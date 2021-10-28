import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ServicebDataSource} from '../datasources';

export interface Serviceb {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  descuentoZona1y2(Zona:number):Promise<object>;
}

export class ServicebProvider implements Provider<Serviceb> {
  constructor(
    // serviceb must match the name property in the datasource json file
    @inject('datasources.serviceb')
    protected dataSource: ServicebDataSource = new ServicebDataSource(),
  ) {}

  value(): Promise<Serviceb> {
    return getService(this.dataSource);
  }
}
