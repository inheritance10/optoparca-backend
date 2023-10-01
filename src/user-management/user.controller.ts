// src/user/user.controller.ts

import {Controller, Get, Post, Body, UseGuards, Req, Param, Patch} from '@nestjs/common';
import { UserService } from './user.service';
import {JwtAuthGuard} from "../auth/JwtAuthGuard";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createUser(@Body() requestBody: any) {
        return this.userService.createUser(requestBody);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    async updateUser(@Body() requestBody: any, @Param('id') id: number) {
        return this.userService.createUser(requestBody);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getByIdUser(@Param() id: number) {

        return this.userService.getByIdUser(id);
    }
}
