import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn} from "typeorm";
import { Claim } from "./claim";
import { Document } from "./document";


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @OneToMany(_type => Claim, (claim: Claim) => claim.user)
  claims!: Array<Claim>;

  @OneToMany(_type => Document, (document: Document) => document.upload_person)
  documents!: Array<Document>;
  
  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}