import { registerEnumType } from "@nestjs/graphql";

export enum DeviceKind{
    TEMPERATURE,
    HUMIDITY,
    MOTION,
    LIGHT
}

export enum DeviceStatus{
    ONLINE,
    OFFLINE
}

registerEnumType(DeviceKind,{
    name : 'deviceType'
})

registerEnumType(DeviceStatus,{
    name : 'deviceStatus'
})