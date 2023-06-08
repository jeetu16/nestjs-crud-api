import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { ValidateUserMiddleware } from "./middlewares/validate-user.middleware";
import { NextFunction, Request, Response } from "express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/User";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidateUserMiddleware,(_req: Request, _res: Response, next: NextFunction) => {
            console.log("Last Middleware");
            next();
        })
            .forRoutes(
                {
                    path: "/users/",
                    method: RequestMethod.GET
                },
                {
                    path: "/users/search/:id",
                    method: RequestMethod.GET
                },
                {
                    path: "/users/:id",
                    method: RequestMethod.PATCH
                }
            )
    }
}