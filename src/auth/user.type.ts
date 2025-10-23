import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AuthRole } from 'src/common/enums/user-role.enum';
import { DeviceType } from 'src/device/device.type';
import { Device } from 'src/device/device.entity';

@ObjectType()
export class UserType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(()=>[DeviceType])
  devices : Device[]
  @Field()
  createdAt: string;
  @Field()
  updatedAt: string;
  @Field({ defaultValue: AuthRole.USER })
  role: AuthRole;
}
