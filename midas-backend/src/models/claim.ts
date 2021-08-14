import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne} from "typeorm";
import { Client } from "./client";
import { Receiver } from "./receiver";
import { Task } from "./task";
import { User } from "./user";

@Entity()
export class Claim {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'text'
    })
    name!: string;

    @Column({
        type: 'text'
    })
    description!: string;

    @Column({
        type: 'text'
    })
    contact_number!: string;

    @Column({ nullable: true })
    user_id!: number;
    @ManyToOne(_type => User, (user: User) => user.claims, { onDelete: 'CASCADE' })
    @JoinColumn()
    user!: User;

    @Column({ nullable: true })
    client_id!: number;
    @OneToOne(_type => Client, (client: Client) => client.claim, { onDelete: 'CASCADE' })
    @JoinColumn()
    client!: Client;

    @OneToMany(_type => Receiver, (receiver: Receiver) => receiver.claim)
    receivers!: Array<Receiver>;

    @OneToMany(_type => Task, (task: Task) => task.claim)
    tasks!: Array<Task>;

    @Column({ type: 'date' })
    start_date!: Date;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}