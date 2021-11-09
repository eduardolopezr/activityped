import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Coupon extends Entity {
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
  descuento: number;
  @property({
    type: 'number',
    required: true,
  })
  montoMinimo: number;
  @property({
    type: 'string',
    required: true,
  })
  nombreCoupon: string;
  @property({
    type: 'string',
    required: false,
  })
  metodoPago: string;
  @property({
    type: 'number',
    required: true,
  })
  zona: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaExpiracion: string;

  @property({
    type: 'number',
    required: true,
  })
  usos: number;



  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Coupon>) {
    super(data);
  }
}

export interface CouponRelations {
  // describe navigational properties here
}

export type CouponWithRelations = Coupon & CouponRelations;
