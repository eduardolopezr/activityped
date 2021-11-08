import {inject} from '@loopback/context';
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
import * as Sentry from "@sentry/node";
import {Integrations} from "@sentry/tracing";
import {Coupon} from '../models';
import {CouponRepository} from '../repositories';
import {Servicea} from '../services';

Sentry.init({
  dsn: "https://0ad992cfa5d24b919b0768554e7a0c6c@o1059754.ingest.sentry.io/6048622",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});


export class CouponController {
  constructor(
    /*@inject('service.serviceb')
    protected serviceb:Serviceb,*/
    @repository(CouponRepository)
    public couponRepository : CouponRepository,

    @inject('services.servicea')
    protected servicea: Servicea
  ) {}
    /*---------------------------------------------------------------*/

    @get('/coupons/descuentoPorZona/{zona}&{precioInicial}&{metodoDePago}&{coupon}')
    async DescuentoPorZona(
      @param.path.number('zona') zona: number,
      @param.path.number('precioInicial') precioInicial: number,
      @param.path.string('metodoDePago') metodoDePago: string,
      @param.path.string('coupon') coupon: string,
      @param.path.string('postalcode') postalcode: string,
    ): Promise<Object> {
      try {
        let getprice = await this.servicea.getpirce("postalcode");
        let descuento =0;
        let precioFinal;
        let envioGratis =false;
        if(precioInicial>10000)
        {
          envioGratis =true;
        }

        if((zona==1||zona==2) && metodoDePago=="paypal" && coupon=="MASTER20")
        {
          descuento =  precioInicial*.15;
          precioFinal = precioInicial-descuento;
        }
        else if((zona==1||zona==2) && metodoDePago=="mastercard" && coupon=="MASTER20")
        {
          descuento =  precioInicial*.20;
          precioFinal = precioInicial-descuento;
        }
        else if(zona==5 && metodoDePago=="mastercard")
        {
          descuento =  precioInicial*.10;
          precioFinal = precioInicial-descuento;
        }
        else if(zona==3 && metodoDePago=="visa" && precioInicial>4000)
        {
          descuento =  precioInicial*.15;
          precioFinal = precioInicial-descuento;
        }
        else if(zona==4 && metodoDePago=="mastercard" && precioInicial>3000)
        {
          envioGratis=true;
        }
        else if((zona==1||zona==2||zona==3) && (metodoDePago=="paypal"||metodoDePago=="mastercard") && coupon=="PERRITOFELI")
        {
          descuento =  precioInicial*.15;
          precioFinal = precioInicial-descuento;
        }
        else if((zona==4||zona==5) && coupon=="NOJADO")
        {
          descuento =  precioInicial*.10;
          precioFinal = precioInicial-descuento;
        }
        else
        {
          precioFinal = precioInicial;
        }

        const InfoDescuento = {
          zona:zona,
          precioInicial:precioInicial,
          metodoDePago:metodoDePago,
          coupon:coupon,
          envioGratis:envioGratis,
          precioFinal:precioFinal
        };
        console.log(InfoDescuento);
        console.log(postalcode);
        return InfoDescuento;
      } catch (e) {
        Sentry.captureException(e);
        return {e:e};
      }

    }


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
