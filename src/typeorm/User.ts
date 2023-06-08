import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn( {
        type:'bigint'
    })
    id : number;

    @Column({
        nullable:false,
        default:""
    })
    firstName: string;

    @Column()
    lastName: string

    @Column({
        nullable: false,
        default: ""
    })
    email: string

    @Column({
        nullable: false,
        default: ""
    })
    password: string

}

