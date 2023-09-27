import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService]
})
export class UserModule {}
