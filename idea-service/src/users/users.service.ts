import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { generateBearerToken } from '../jwt/generateBearerToken';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {

  }
  async createUser(user: User): Promise<any> {
    // SQL Query executed: FROM USER SELECT * WHERE email = user.email;
    const found = await this.userRepository.createQueryBuilder('User').where('email = :email', { email: user.email }).getOne();
    if (found) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    } else {
      return this.userRepository.insert(user);
    }
  }
  async deleteUser(userId: string): Promise<any> {
    const found = await this.userRepository.findOne(userId);
    if (found) {
      return this.userRepository.delete(userId);
    } else {
      throw new HttpException('User not found. Unable to delete', HttpStatus.NOT_FOUND);
    }
  }
  async login(user: any): Promise<any> {
    // SQL Query executed: FROM USER SELECT * WHERE email = user.email;
    const found = await this.userRepository.createQueryBuilder('User').where('email = :email', { email: user.email }).getOne();
    if (found) {
      if(user.password === found.password) {
        const token = generateBearerToken(user);
        delete found.password;
        return { token, found };
      } else {
        throw new HttpException('Incorrect Password', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('There is no user under that email', HttpStatus.NOT_FOUND);
    }
  }
}