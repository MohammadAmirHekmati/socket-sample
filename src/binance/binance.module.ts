import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BinanceGateway } from './gateway/binance.gateway';

@Module({
    imports:[ScheduleModule.forRoot()],
    providers:[BinanceGateway]
})
export class BinanceModule {}
