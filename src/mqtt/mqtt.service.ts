import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as mqtt from 'mqtt';
import { Sensor } from 'src/sensor/sensor.entity';
import { SensorResolver } from 'src/sensor/sensor.resolver';
import { SensorType } from 'src/sensor/sensor.type';
import { Repository } from 'typeorm';

@Injectable()
export class MqttService implements OnModuleInit {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
    private configService: ConfigService
  ) {}
  private client: mqtt.MqttClient;

  onModuleInit() {
    this.client = mqtt.connect({
      host: this.configService.get('MQTT_HOST'),
      port: this.configService.get('MQTT_PORT'),
      username: this.configService.get('MQTT_USERNAME'),
      password: this.configService.get('MQTT_PASSWORD'),
      protocol: this.configService.get('MQTT_PROTOCOL'),
      
    });
    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.subscribeToTopic('device/+/sensor');
    });
    this.client.on('error', (error) => {
      console.error('MQTT error:', error.message);
    });
    this.client.on('close', () => {
      console.log('MQTT connection CLOSED or failed to open.');
    });
    this.client.on('message', (topic, payload) => {
      this.handleIncomingMessage(topic, payload);
    });
  }

  public subscribeToTopic(topic: string): void {
    this.client.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Subscribed to topic: ${topic}`);
      } else {
        console.error(`Subscription error on ${topic}:`, err);
      }
    });
  }

  async handleIncomingMessage(topic: string, payload: Buffer): Promise<void> {
    try {
      const mqttData = JSON.parse(payload.toString());
      const topicParts = topic.split('/');
      if (topicParts.length < 3 || topicParts[1].length === 0) {
        console.warn(`Invalid topic format received: ${topic}`);
        return;
      }
      const deviceId = topicParts[1];
      const realTimeData: SensorType = {
        deviceId,
        temperature: mqttData.temperature,
        humidity: mqttData.humidity,
        timestamp: new Date().toISOString(),
      };

      SensorResolver.publishSensorData(realTimeData);
      await this.sensorRepository.save(realTimeData);
    } catch (error) {
      console.log(
        `ERROR processing MQTT message from ${topic}:`,
        error.message,
      );
    }
  }
  public simulateDeviceMessage(deviceId: string, temp: number, hum: number): void {
    const topic = `device/${deviceId}/sensor`;
    
   
    const payloadObject = { 
        temperature: temp, 
        humidity: hum 
    };
    const payload = Buffer.from(JSON.stringify(payloadObject));
    
    
    
   
    this.handleIncomingMessage(topic, payload);
}
}
