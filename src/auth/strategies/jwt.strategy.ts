import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { User } from '../../user/models/user';
import { jwtSecret } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(validationPayload: { email: string; sub: string }): User | null {
    console.log('llegue a esta estrageia jwt');
    const user = this.userService.getUserByEmail(validationPayload.email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
