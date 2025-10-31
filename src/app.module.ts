import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DeviceModule } from './device/device.module';
import { MqttModule } from './mqtt/mqtt.module';
import { MqttService } from './mqtt/mqtt.service';
import { SensorModule } from './sensor/sensor.module';
import {ConfigModule,ConfigService} from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: ['.env'],
    }),
    AuthModule,
    SensorModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({
        token: req.headers.authorization?.replace('Bearer ', ''),
      }),
    }),
    DeviceModule,
   
    MqttModule,
  ],
  providers:[MqttService]
})
export class AppModule {}
