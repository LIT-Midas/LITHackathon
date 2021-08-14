import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, UpdateDateColumn, OneToOne, OneToMany} from "typeorm";
import { Claim } from "./claim";
import { Document } from "./document";

/**
 * @tsoaModel
 */
@Entity()
export class Client {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  access_code!: string;

  @Column({ nullable: true })
  claim_id!: number;
  @OneToOne(_type => Claim, (claim: Claim) => claim.client, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "claim_id" })
  claim!: Claim;
  
  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}