import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {User} from "../entities/user.entity";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() requestBody: any): Promise<User>
  {
     return this.authService.register(requestBody);
  }

  @Post('login')
  async login(@Body() requestBody: any): Promise<{token: any, user: User}> {
    // Burada requestBody içinde gelen veri bulunur.
    const {token, user} = await this.authService.login(requestBody);
    return { token, user };
  }
}
