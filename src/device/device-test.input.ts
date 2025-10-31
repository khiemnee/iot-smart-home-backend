import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class SimulateInput {
  @Field()
  deviceId: string;

  @Field(() => Float)
  temp: number;

  @Field(() => Float)
  hum: number;
}