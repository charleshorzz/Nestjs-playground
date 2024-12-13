import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';

/**
 * Class to connect to Users table and perform business operations
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    private readonly configService: ConfigService,
  ) {}

  public async createUser(createuserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createuserDto.email },
    });

    let newUser = this.usersRepository.create(createuserDto);

    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }
  /**
   * Find all users
   */
  public findAll(userId: string) {
    const env = this.configService.get('S3_BUCKET');
    console.log('env', env);
    const isAuth = this.authService.isAuth();
    console.log('isAuth', isAuth);

    return [
      { id: userId, name: 'John Doe' },
      { id: 2, name: 'Alice Caeiro' },
      { id: 3, name: 'Who Knows' },
    ];
  }

  public findOneById(userId: string) {
    return { id: userId, name: 'John Doe' };
  }
}
