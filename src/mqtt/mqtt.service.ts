import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;

  onModuleInit() {
    this.client = mqtt.connect({
      host: '9b87979a1f8f4f0fa217a4fa8827c4b9.s1.eu.hivemq.cloud',
      port: 8883,
      username: 'khiem',
      password: 'Phamduykhiem2911',
      protocol: 'mqtts',
    });
    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.subscribeToTopic('testdevice/1');
    });
    this.client.on('error', (error) => {
      console.error('MQTT error:', error.message);
    });
    this.client.on('close', () => {
      console.log('MQTT connection CLOSED or failed to open.');
    });
    this.client.on('message',(topic,payload)=>{
        this.handleIncomingMessage(topic, payload);
    })
  }
  public subscribeToTopic(topic: string): void {
    this.client.subscribe(topic, (err) => {
      if (!err) {
        console.log(`✅ Subscribed to topic: ${topic}`);
      } else {
        console.error(`❌ Subscription error on ${topic}:`, err);
      }
    });
  }
  private handleIncomingMessage(topic: string, payload: Buffer): void {
    const message = payload.toString();
    console.log(`--- NEW MESSAGE RECEIVED ---`);
    console.log(`Topic: ${topic}`);
    console.log(`Payload: ${message}`);
    console.log(`----------------------------`);
  }
}
