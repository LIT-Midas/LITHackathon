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
    uploader_name!: string;
  
    @Column({
      type: 'text',
      nullable: true,
    })
    upload_url!: string;

    @Column({ nullable: true })
    claim_id!: number;
    @ManyToOne(_type => Claim, (claim: Claim) => claim.documents, { eager: true, onDelete: 'CASCADE' })
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

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}