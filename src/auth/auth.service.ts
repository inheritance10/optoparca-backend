import {Injectable, UnauthorizedException} from "@nestjs/common";
import * as bcrypt from 'bcryptjs'
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ) {
    }


    async register(body: any): Promise<any> {
        const {name, email, password, username, lastname} = body;

        const isUser = await this.userRepository.findOne({where: {email: email}});
        if (isUser) return {error: 'Bu email adresi ile daha önce kayıt olunmuş', statusCode: 400};

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            name,
            email,
            username,
            lastname,
            password: hashPassword
        });

        return await this.userRepository.save(newUser);
    }

    async login(body: any): Promise<{ token: string, user: User }> {

        const {email, password} = body;

        const user = await this.userRepository.findOne({where: {email: email}});

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.jwtService.sign({id: user.id});

        return {token: token, user: user};
    }

}
