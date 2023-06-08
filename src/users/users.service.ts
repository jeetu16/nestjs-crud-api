import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SerializedUser } from "./model/User";
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from "./dto/Create.User.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User as UserEntity } from "src/typeorm/User";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/Update.User.dto";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    async getAllUsers() {
        const users = (await this.userRepository.find()).map(user => plainToClass(SerializedUser, user));
        return users;
    }

    async findUserById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) return plainToClass(SerializedUser, user)
        else throw new HttpException("Not found any user", HttpStatus.NOT_FOUND)
    }

    async createUser(userDto: CreateUserDto, email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            throw new HttpException("User already exists", HttpStatus.CONFLICT)
        }
        const newUser = this.userRepository.create(userDto);
        this.userRepository.save(newUser);
        return {
            message: "User Successfully Created",
            user: plainToClass(SerializedUser, newUser)
        }
    }

    async deleteUser(id: number) {
        if (!id) {
            throw new HttpException("Please Provide id", HttpStatus.BAD_REQUEST)
        }
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new HttpException("Not found any user", HttpStatus.NOT_FOUND);
        }
        await this.userRepository.delete(id);
        return {
            message: "Successfully deleted",
            user: plainToClass(SerializedUser, user)
        }
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        if (!id) {
            throw new HttpException("Please Provide id", HttpStatus.BAD_REQUEST)
        }
        const user = await this.userRepository.findOne({ where: { id } });
        console.log(user)
        if (!user) {
            throw new HttpException("Not found any user", HttpStatus.NOT_FOUND);
        }
        await this.userRepository.update(id, updateUserDto);
        const updatedUser = await this.userRepository.findOne({ where: { id } });

        return {
            message: "successfully updated user",
            updatedUser: plainToClass(SerializedUser, updatedUser)
        }
    }
}