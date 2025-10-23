import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthRole } from 'src/common/enums/user-role.enum';

@InputType()
export class AuthInput {
  @Field({ nullable: true })
  @IsOptional()
  @MinLength(8)
  @MaxLength(12)
  name?: string;
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @Field()
  @IsNotEmpty()
  password: string;
  @Field(() => AuthRole, { nullable: true })
  @IsOptional()
  role?: AuthRole;
}
