import { ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType()
export class SensorType {
  @Column()
  deviceId: string;
  @Column()
  temperature: string;
  @Column()
  humidity: string;
  @Column()
  timestamp: string;
}
