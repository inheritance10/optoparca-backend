import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from "../entities/user.entity";
import * as bcrypt from 'bcryptjs'
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async createUser(requetBody: any): Promise<User> {

        //password hash yapilcak
        const isUser = await this.userRepository.findOne({where: {email: requetBody?.email}});
        if(isUser) throw new Error('Bu email adresi ile daha önce kayıt olunmuş');

        const hashPassword = await bcrypt.hash(requetBody?.password, 10);

        const body = {
            name: requetBody?.name,
            email: requetBody?.email,
            password: hashPassword,
            lastname: requetBody?.surname,
            phoneNumber: requetBody?.phoneNumber,
            username: requetBody?.username,
            address: requetBody?.address,
            role: requetBody?.role,
            company: requetBody?.company,

        }

        return await this.userRepository.save(body);
    }

    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOneById(id);
    }
}
