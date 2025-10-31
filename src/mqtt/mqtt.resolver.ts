import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { MqttService } from "./mqtt.service";
import { SensorType } from "src/sensor/sensor.type";
import { SimulateInput } from "src/device/device-test.input";


@Resolver(of => SensorType)
export class MqttResolver{
    constructor(
        private mqttService : MqttService
    ){}

    @Mutation(()=>Boolean)
    emulatorDevice(@Args('input') input:SimulateInput ):boolean{
        this.mqttService.simulateDeviceMessage(input.deviceId,input.temp,input.hum)
        return true
    }
}