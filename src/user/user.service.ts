import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "../entities/user.entity";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async createUser(requetBody: any): Promise<{user: User} | { error: string, statusCode: number }> {
        try {
            const isUser = await this.userRepository.findOne({where: {email: requetBody?.email}});
            if (isUser) return {error: 'Bu email adresi ile daha önce kayıt olunmuş', statusCode: 400};

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
            const user = await this.userRepository.save(body);
            return {user}

        } catch (error) {
            throw new Error(error)
        }


    }

    async getByIdUser(id: number): Promise<{ user: User } | { error: string, statusCode: number }> {
        try {
            const user = await this.userRepository.findOneById(id);

            if (!user) {
                throw new Error("Kullanıcı bulunamadı.");
            }

            return {user};
        } catch (error) {
            throw new NotFoundException('User Not Found')
        }
    }
}
