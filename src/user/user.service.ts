import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

type getUserByType = {
  id?: string;
  email?: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUser(getUserBy: getUserByType): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy(getUserBy);

    return user;
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const userCreated = await this.userRepository.save(user);

    return userCreated;
  }

  async updateUser(user: UserEntity): Promise<UserEntity> {
    const userUpdated = await this.userRepository.save(user);

    return userUpdated;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
