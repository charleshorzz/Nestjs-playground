import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../users/providers/users.service';
import { forwardRef } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public login(email: string, password: string) {
    const user = this.userService.findOneById('1234');
    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}
