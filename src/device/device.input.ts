import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';
import { DeviceKind,DeviceStatus } from 'src/common/enums/device.enum';

@InputType()
export class DeviceInput {
  @Field()
  @MinLength(8)
  @MaxLength(12)
  name: string;
  @Field(()=>DeviceKind)
  type: DeviceKind;
  @Field(()=>DeviceStatus)
  status: DeviceStatus;
  @Field()
  firmwareVersion: string;
}
