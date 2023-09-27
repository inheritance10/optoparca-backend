import {Entity, Column, PrimaryGeneratedColumn, Unique} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    username: string | null;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    company: string;

    @Column()
    phoneNumber: string;

    @Column()
    role: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    postalCode: string;

    @Column()
    address: string;
}
