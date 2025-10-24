import { Field, ID, InputType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { DeviceStatus } from "src/common/enums/device.enum";

@InputType()
export class DeviceUpdateInput{
    @Field(()=>ID)
    id : string
    @Field()
    @IsOptional()
    name? : string
    @Field(()=>DeviceStatus,{nullable:true})
    @IsOptional()
    status? : DeviceStatus
}