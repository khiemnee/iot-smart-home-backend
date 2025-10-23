import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { UserResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'iot_key',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    
    TypeOrmModule.forFeature([Auth]),
  ],
  providers: [AuthService, UserResolver,JWTStrategy],
  exports: [JwtModule,PassportModule],
})
export class AuthModule {}
