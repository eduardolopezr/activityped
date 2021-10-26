import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Price extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  precioInicial: number;

  @property({
    type: 'number',
    required: true,
  })
  precioConCoupon: number;

  @property({
    type: 'string',
    required: true,
  })
  cuponAUsar: string;

  @property({
    type: 'string',
    required: true,
  })
  metodoDePago: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Price>) {
    super(data);
  }
}

export interface PriceRelations {
  // describe navigational properties here
}

export type PriceWithRelations = Price & PriceRelations;
