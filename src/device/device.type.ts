import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Auth } from 'src/auth/auth.entity';
import { UserType } from 'src/auth/user.type';
import { DeviceKind,DeviceStatus } from 'src/common/enums/device.enum';

@ObjectType()
export class DeviceType {
  @Field((type) => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  type: DeviceKind;
  @Field()
  status: DeviceStatus;
  @Field()
  firmwareVersion: string;
  @Field(() => UserType)
  user: Auth;
  @Field()
  createdAt: string;
  @Field()
  updatedAt: string;
}
