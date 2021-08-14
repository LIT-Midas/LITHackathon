import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany} from "typeorm";
import { User } from "./user";
import { Client } from "./client";
import { Claim } from "./claim";
import { Receiver } from "./receiver";

export interface IRecordOfAny {
  [key: string]: any;
}

@Entity()
export class Document {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'text'
    })
    name!: string;
  
    @Column({
      type: 'text',
      nullable: true,
    })
    title!: string;
  
    @Column({
      type: 'text',
      nullable: true,
    })
    status!: string;
  
    @Column({
      type: 'text',
      nullable: true,
    })
    upload_url!: string;

    @Column({ nullable: true })
    claim_id!: number;
    @ManyToOne(_type => Claim, (claim: Claim) => claim.tasks, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "claim_id" })
    claim!: Claim;

    @Column({
      type: 'text',
      nullable: true
    })
    type!: string;
  
    @Column({
      type: 'text',
      nullable: true
    })
    job_id!: string;
  
    @Column({
      type: 'jsonb',
      nullable: true
    })
    form_data!: Array<IRecordOfAny>;
  
    @Column({
      type: 'jsonb',
      nullable: true
    })
    raw!: Array<string>;
  
    @Column({ nullable: true })
    upload_person_id!: number;
    @ManyToOne(_type => User || Client, (upload_person: User | Client) => upload_person.documents, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "upload_person_id" })
    upload_person!: User | Client;
  
    @Column({
      type: 'text',
      nullable: true
    })
    persona!: string;
  
    @ManyToMany(_type => Receiver, (receiver: Receiver) => receiver.documents)
    shared_with!: Array<Receiver>;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}