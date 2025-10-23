import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Repository } from 'typeorm';
import { DeviceInput } from './device.input';
import { Auth } from 'src/auth/auth.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async registerDevice(deviceInput: DeviceInput,user:Auth): Promise<Device> {
    const { name, status, type, firmwareVersion } =
      deviceInput;
    const device = this.deviceRepository.create({
      name,
      status,
      type,
      createdAt : new Date().toISOString(),
      updatedAt : new Date().toISOString(),
      user,
      firmwareVersion,
    });
    return await this.deviceRepository.save(device);
  }

  async getMyDevices(user:string):Promise<Device[]>{

        
        const devices = await this.deviceRepository.findBy({
             user : {
                id : user
             }
        })
        console.log(devices)
        return devices
  }
}
