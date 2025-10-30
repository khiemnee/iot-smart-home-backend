import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';

@Module({
    imports : [TypeOrmModule.forFeature([Sensor])],
    exports : [TypeOrmModule]
})
export class SensorModule {}
