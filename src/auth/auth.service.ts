import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { AuthInput } from './auth.input';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private userRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async registerUser(authInput: AuthInput): Promise<Auth> {
    const { name, email, password, role } = authInput;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role,
    });

    return await this.userRepository.save(user);
  }

  async loginUser(authInput: AuthInput): Promise<{}> {
    const { email, password } = authInput;

    const user = await this.userRepository.findOneBy({ email });


    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { id: user.id };

     

      const token = this.jwtService.sign(payload);

      return {
        user,
        token
      }
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
