import { IsNumber, IsNotEmpty, IsString, IsEmail } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    lastName: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}