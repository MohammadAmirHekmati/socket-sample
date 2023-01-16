import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceModule } from './binance/binance.module';
const axios = require('axios')
// 'https://apiplus.novintex.com/'
@Module({
  imports: [BinanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  hosts:string[]=['http://195.201.86.188:42621/']
  async onModuleInit() {
    try {
      for (const host of this.hosts) {
        const res=await axios.get(`${host}api/v1/price-irr/pricing/hook`,{timeout: 20000})
        if(res.status=200)
        console.log(`----------- Request wa made it succesfully ${host}  --------`)
      }
    } catch (e) {
      console.log("------------ error -------------")
      console.log(`--------- for server  ${e.cause.address}:${e.cause.port} ------------`)
      console.log(e.cause.code)
    }
   
  }
}
// 