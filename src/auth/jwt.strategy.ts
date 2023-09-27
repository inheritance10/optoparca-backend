import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import * as process from "process";
import {Repository} from "typeorm";
import {User} from "../entities/user.entity";
import {PassportStrategy} from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
      private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey : process.env.JWT_SECRET
    });
  }

  async validate(payload: any){
    return {user: payload.sub, username: payload.username};


  /*  const {id} = payload;

    const user = await this.userRepository.findOne(id);

    if(!user){
      throw new UnauthorizedException('Login first to access this endpoint');
    }

    return user;*/
  }
}