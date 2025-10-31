import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { UserResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config'; 

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports : [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), 
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN') || '1h', 
        },
      }),
     
      inject: [ConfigService], 
    }),
    
    TypeOrmModule.forFeature([Auth]),
  ],
  providers: [AuthService, UserResolver,JWTStrategy],
  exports: [JwtModule,PassportModule],
})
export class AuthModule {}
