import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Coupon} from '../models';
import {CouponRepository} from '../repositories';

export class CouponController {
  constructor(
    @repository(CouponRepository)
    public couponRepository : CouponRepository,
  ) {}
    /*---------------------------------------------------------------*/
    @get('/coupons/descuentoZona1y2/{Zona}&{PrecioInicial}&{MetodoDePago}&{Coupon}')
    async CalcularPrecioZona1y2(
      @param.path.number('Zona') Zona: number,
      @param.path.number('PrecioInicial') PrecioInicial: number,
      @param.path.string('MetodoDePago') MetodoDePago: string,
      @param.path.string('Coupon') Coupon: string
    ): Promise<Number> {

      var descuento =0;
      var precio =PrecioInicial;
      var precioFinal =0;

      if((Zona==1||Zona==2) && MetodoDePago=="paypal" && Coupon=="MASTER20")
      {
        descuento =  precio*.15;
        precioFinal = precio-descuento;
      }
      else if((Zona==1||Zona==2) && MetodoDePago=="mastercard" && Coupon=="MASTER20")
      {
        descuento =  precio*.20;
        precioFinal = precio-descuento;
      }
      else
      {
        precioFinal = precio;
      }

      return precioFinal;
    }
    @get('/coupons/descuentoZona5/{Zona}&{PrecioInicial}&{MetodoDePago}')
    async CalcularPrecioZona5(
      @param.path.number('Zona') Zona: number,
      @param.path.number('PrecioInicial') PrecioInicial: number,
      @param.path.string('MetodoDePago') MetodoDePago: string
    ): Promise<Number> {

      var descuento =0;
      var precio =PrecioInicial;
      var precioFinal =0;

      if(Zona==5 && MetodoDePago=="mastercard")
      {
        descuento =  precio*.10;
        precioFinal = precio-descuento;
      }
      else
      {
        precioFinal = precio;
      }

      return precioFinal;
    }
    @get('/coupons/descuentoZona3/{Zona}&{PrecioInicial}&{MetodoDePago}')
    async CalcularPrecioZona3(
      @param.path.number('Zona') Zona: number,
      @param.path.number('PrecioInicial') PrecioInicial: number,
      @param.path.string('MetodoDePago') MetodoDePago: string
    ): Promise<Number> {

      var descuento =0;
      var precio =PrecioInicial;
      var precioFinal =0;

      if(Zona==3 && MetodoDePago=="visa" && PrecioInicial>4000)
      {
        descuento =  precio*.15;
        precioFinal = precio-descuento;
      }
      else
      {
        precioFinal = precio;
      }

      return precioFinal;
    }
    @get('/coupons/descuentoZona4/{Zona}&{PrecioInicial}&{MetodoDePago}')
    async EnvioGratis4(
      @param.path.number('Zona') Zona: number,
      @param.path.number('PrecioInicial') PrecioInicial: number,
      @param.path.string('MetodoDePago') MetodoDePago: string
    ): Promise<Boolean> {

      var envioGratis=false;

      if(Zona==4 && MetodoDePago=="mastercard" && PrecioInicial>3000)
      {
        envioGratis=true;
      }

      return envioGratis;
    }
    @get('/coupons/descuentoZona4/{Zona}&{PrecioInicial}')
    async envioGratis (
      @param.path.number('Zona') Zona: number,
      @param.path.number('PrecioInicial') PrecioInicial: number,
      @param.path.string('MetodoDePago') MetodoDePago: string
    ): Promise<Boolean> {

      var envioGratis=false;

      if(PrecioInicial>10000)
      {
        envioGratis=true;
      }

      return envioGratis;
    }

    @get('/coupons/descuentoZona1y2/{Zona}&{PrecioInicial}&{MetodoDePago}&{Coupon}')
    async CalcularPrecioUltimo(
      @param.path.number('Zona') Zona: number,
      @param.path.number('PrecioInicial') PrecioInicial: number,
      @param.path.string('MetodoDePago') MetodoDePago: string,
      @param.path.string('Coupon') Coupon: string
    ): Promise<Number> {

      var descuento =0;
      var precio =PrecioInicial;
      var precioFinal =0;

      if((Zona==1||Zona==2||Zona==3) && (MetodoDePago=="paypal"||MetodoDePago=="mastercard") && Coupon=="PERRITOFELI")
      {
        descuento =  precio*.15;
        precioFinal = precio-descuento;
      }
      else if((Zona==4||Zona==5) && Coupon=="NOJADO")
      {
        descuento =  precio*.10;
        precioFinal = precio-descuento;
      }
      else
      {
        precioFinal = precio;
      }

      return precioFinal;
    }
    /*---------------------------------------------------------------*/

  @post('/coupons')
  @response(200, {
    description: 'Coupon model instance',
    content: {'application/json': {schema: getModelSchemaRef(Coupon)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coupon, {
            title: 'NewCoupon',
            exclude: ['id'],
          }),
        },
      },
    })
    coupon: Omit<Coupon, 'id'>,
  ): Promise<Coupon> {
    return this.couponRepository.create(coupon);
  }

  @get('/coupons/count')
  @response(200, {
    description: 'Coupon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Coupon) where?: Where<Coupon>,
  ): Promise<Count> {
    return this.couponRepository.count(where);
  }

  @get('/coupons')
  @response(200, {
    description: 'Array of Coupon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Coupon, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Coupon) filter?: Filter<Coupon>,
  ): Promise<Coupon[]> {
    return this.couponRepository.find(filter);
  }

  @patch('/coupons')
  @response(200, {
    description: 'Coupon PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coupon, {partial: true}),
        },
      },
    })
    coupon: Coupon,
    @param.where(Coupon) where?: Where<Coupon>,
  ): Promise<Count> {
    return this.couponRepository.updateAll(coupon, where);
  }

  @get('/coupons/{id}')
  @response(200, {
    description: 'Coupon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Coupon, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Coupon, {exclude: 'where'}) filter?: FilterExcludingWhere<Coupon>
  ): Promise<Coupon> {
    return this.couponRepository.findById(id, filter);
  }

  @patch('/coupons/{id}')
  @response(204, {
    description: 'Coupon PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coupon, {partial: true}),
        },
      },
    })
    coupon: Coupon,
  ): Promise<void> {
    await this.couponRepository.updateById(id, coupon);
  }

  @put('/coupons/{id}')
  @response(204, {
    description: 'Coupon PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() coupon: Coupon,
  ): Promise<void> {
    await this.couponRepository.replaceById(id, coupon);
  }

  @del('/coupons/{id}')
  @response(204, {
    description: 'Coupon DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.couponRepository.deleteById(id);
  }
}
