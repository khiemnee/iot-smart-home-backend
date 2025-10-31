import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Repository } from 'typeorm';
import { DeviceInput } from './device.input';
import { Auth } from 'src/auth/auth.entity';
import { DeviceUpdateInput } from './device-update.input';
import { AuthRole } from 'src/common/enums/user-role.enum';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async registerDevice(deviceInput: DeviceInput, user: Auth): Promise<Device> {
    const { name, status, type, firmwareVersion } = deviceInput;
    const device = this.deviceRepository.create({
      name,
      status,
      type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user,
      firmwareVersion,
    });
    
    return await this.deviceRepository.save(device);
  }

  async getMyDevices(user: Auth): Promise<Device[]> {
    const devices = await this.deviceRepository.find({
      where : {
        user 
      },
      relations : ['user']
    });

    if(!devices){
      throw new NotFoundException()
    }
    return devices
  }

  async updateDevice(user:Auth,deviceUpdateInput:DeviceUpdateInput):Promise<Device>{
      const {...update} = deviceUpdateInput
      const device = await this.deviceRepository.findOneBy({
        user: {
          id : user.id
        },
        id : update.id
      })
      if(!device){
        throw new NotFoundException()
      }
      Object.assign(device,update)
      return await this.deviceRepository.save(device)
     
  }

  async getAllDevices(user:Auth):Promise<Device[]>{
    if(user.role !== AuthRole.ADMIN){
      throw new ForbiddenException()
    }
    const devices = await this.deviceRepository.find({
      relations : ['user']
    })
    return devices
  }
}
