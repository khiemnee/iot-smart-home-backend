import { Args, Mutation, Resolver,Query } from '@nestjs/graphql';
import { DeviceType } from './device.type';
import { DeviceService } from './device.service';
import { DeviceInput } from './device.input';
import { GetUser } from 'src/auth/get-user.decorator';
import { Auth } from 'src/auth/auth.entity';
import {  UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver(of => DeviceType)
export class DeviceResolver {
  constructor(private deviceService: DeviceService) {}

  @Mutation(returns => DeviceType)
  @UseGuards(GqlAuthGuard)
  registerDevice(
    @Args('deviceInput') deviceInput: DeviceInput,
    @GetUser() user: Auth,
  ) {
    return this.deviceService.registerDevice(deviceInput, user);
  }
  @Query(returns => [DeviceType])
  @UseGuards(GqlAuthGuard)
  getMyDevices(
    @GetUser()user :Auth
  ){
    console.log('here')
    return this.deviceService.getMyDevices(user.id)
  }
}
