import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../user/models/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameFiel: 'email' });
  }

  validate(email: string, passport: string): User {
    console.log('llegue a la estrageia local');
    const user = this.authService.validate(email, passport);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
