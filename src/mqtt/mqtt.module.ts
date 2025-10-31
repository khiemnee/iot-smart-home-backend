import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';

import { SensorModule } from 'src/sensor/sensor.module';
import { MqttResolver } from './mqtt.resolver';


@Module({
  imports : [
    SensorModule
  ],
  providers: [MqttService,MqttResolver],
  exports : [MqttService]
})
export class MqttModule {}
