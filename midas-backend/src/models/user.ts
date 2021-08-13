import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn} from "typeorm";
import { Claim } from "./claim";


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
  
  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}