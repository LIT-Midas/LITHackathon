import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinTable} from "typeorm";
import { Claim } from "./claim";
import { Document } from "./document";

/**
 * @tsoaModel
 */
@Entity()
export class Receiver {

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
  @ManyToOne(_type => Claim, (claim: Claim) => claim.receivers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "claim_id" })
  claim!: Claim;

  @ManyToMany(_type => Document, (document: Document) => document.receivers, {eager: true})
  @JoinTable()
  documents!: Document[];
  
  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}