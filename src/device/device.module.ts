import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { DeviceService } from './device.service';
import { DeviceResolver } from './device.resolver';

@Module({
    imports : [
        TypeOrmModule.forFeature([Device])
    ],
    providers: [DeviceService,DeviceResolver]
})
export class DeviceModule {
    
}
