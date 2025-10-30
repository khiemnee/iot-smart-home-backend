import { Injectable, OnModuleInit } from '@nestjs/common';
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
  ) {}
  private client: mqtt.MqttClient;

  onModuleInit() {
    this.client = mqtt.connect({
      host: '9b87979a1f8f4f0fa217a4fa8827c4b9.s1.eu.hivemq.cloud',
      port: 8884,
      username: 'khiem',
      password: 'Phamduykhiem2911',
      protocol: 'wss',
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
}
