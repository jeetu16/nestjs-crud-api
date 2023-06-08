import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/User';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type:"mysql",
    host:"localhost",
    port: 3306,
    username:"root",
    password:"Mysql$1234",
    database:'testDB',
    entities: [User],
    synchronize: false,
    migrationsRun: false,
  })],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }],
})  
export class AppModule {}
