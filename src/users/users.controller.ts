import { Controller, Get, Param, ParseIntPipe, Req, Res, Post, Body, UsePipes, UseInterceptors, ClassSerializerInterceptor, Delete, Put, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto/Create.User.dto";
import { UpdateUserDto } from "./dto/Update.User.dto";


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Get()
    getUser() {
        return this.usersService.getAllUsers();
    }

    // @Get("/:id")
    // getUserById(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Req() req: Request,
    //     @Res() res: Response
    // ) {
    //     const user = this.usersService.findUserById(id);

    //     if (user) {
    //         res.status(200).send({ success: true, user })
    //     } else {
    //         res.status(404).send({ status: false, message: "Not found any user" })
    //     }
    // }

    @Get("/search/:id")
    searchUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUserById(id);
    }

    @Post("/register")
    registerUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto, createUserDto.email);
    }

    @Delete('/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }

    @Patch("/:id")
    updateUser(
        @Body() updateUserDto: UpdateUserDto,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.usersService.updateUser(id, updateUserDto);
    }
}