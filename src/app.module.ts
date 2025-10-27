import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DeviceModule } from './device/device.module';
import { MqttModule } from './mqtt/mqtt.module';
import { MqttService } from './mqtt/mqtt.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'phamduykhiem2911',
      database: 'iot_smart_home',
      autoLoadEntities: true,
      synchronize: true,
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
