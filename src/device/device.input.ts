import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, minLength, MinLength } from 'class-validator';
import { DeviceKind,DeviceStatus } from 'src/common/enums/device.enum';

@InputType()
export class DeviceInput {
  @Field()
  @MinLength(3)
  @MaxLength(32)
  name: string;
  @Field(()=>DeviceKind)
  type: DeviceKind;
  @Field(()=>DeviceStatus,{defaultValue : DeviceStatus.OFFLINE})
  status: DeviceStatus;
  @Field()
  @MinLength(3)
  @MaxLength(64)
  firmwareVersion: string;
}
