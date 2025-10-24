import { Args, Mutation, Resolver,Query } from '@nestjs/graphql';
import { DeviceType } from './device.type';
import { DeviceService } from './device.service';
import { DeviceInput } from './device.input';
import { GetUser } from 'src/auth/get-user.decorator';
import { Auth } from 'src/auth/auth.entity';
import {  UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { DeviceUpdateInput } from './device-update.input';

@Resolver(of => DeviceType)
@UseGuards(GqlAuthGuard)
export class DeviceResolver {
  constructor(private deviceService: DeviceService) {}

  @Mutation(returns => DeviceType)
  registerDevice(
    @Args('deviceInput') deviceInput: DeviceInput,
    @GetUser() user: Auth,
  ) {
    return this.deviceService.registerDevice(deviceInput, user);
  }
  @Query(returns => [DeviceType])
  getMyDevices(
    @GetUser()user :Auth
  ){
    return this.deviceService.getMyDevices(user)
  }

  @Mutation(returns => DeviceType)
  updateDevice(
    @Args('deviceUpdateInput') deviceUpdateInput:DeviceUpdateInput,
    @GetUser() user : Auth
  ){
    return this.deviceService.updateDevice(user,deviceUpdateInput)
  }

  @Query(returns => [DeviceType])
  getAllDevices(
    @GetUser() user :Auth
  ){
    return this.deviceService.getAllDevices(user)
  }
}
