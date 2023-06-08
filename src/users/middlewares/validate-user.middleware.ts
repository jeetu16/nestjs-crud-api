import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
    use(req : Request, res : Response, next: NextFunction) {
        console.log("First Middleware");
        
        const { authorization } = req.headers;

        if(!authorization) {
            throw new HttpException("No authorized token", HttpStatus.BAD_REQUEST);
        }
        if(authorization === "authorizationtoken") {
            next();
        } else {
            throw new HttpException("Unauthorized Access", HttpStatus.UNAUTHORIZED);
        }
    }
}


