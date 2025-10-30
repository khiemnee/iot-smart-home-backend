import { Resolver, Subscription, Args } from '@nestjs/graphql';

import { PubSub } from 'graphql-subscriptions';

import { SensorType } from './sensor.type';

const pubSub = new PubSub();

@Resolver()
export class SensorResolver {
  @Subscription(() => SensorType, {
    name: 'sensorDataReceived',

    filter: (payload, variables) =>
      payload.sensorDataReceived.deviceId === variables.deviceId,
  })
  sensorDataReceived(@Args('deviceId') deviceId: string) {
    return pubSub.asyncIterableIterator('sensorDataReceived');
  }

  static publishSensorData(data: SensorType) {
    console.log(data)
    pubSub.publish('sensorDataReceived', { sensorDataReceived: data });
  }
}
