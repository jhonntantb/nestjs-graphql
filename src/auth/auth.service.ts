import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  validate(email: string, password: string): User | null {
    const user = this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const passwordIsValidate = password === user.password;
    return passwordIsValidate ? user : null;
  }

  login(user: User): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user.userId,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  verify(token: string): User {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
    });

    const user = this.userService.getUserByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get the user from decoded token');
    }
    return user;
  }
}
