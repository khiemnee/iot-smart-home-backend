import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy,ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Auth } from '../auth.entity';
import { JwtPayload } from '../jwt.payload';


@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Auth)
    private userRepository:Repository<Auth>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'iot_key',
    });
  }


        
  async validate(authPayload:JwtPayload) : Promise<Auth>{

  

    const {id} = authPayload

    
    const user = await this.userRepository.findOneBy({id})


     if(!user){
        throw new UnauthorizedException();
    }

    return user
  }

}
