import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn} from "typeorm";
import { Claim } from "./claim";

@Entity()
export class Document {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'text'
    })
    name!: string;

    @Column({ nullable: true })
    claim_id!: number;
    @ManyToOne(_type => Claim, (claim: Claim) => claim.tasks, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "claim_id" })
    claim!: Claim;
  
    @Column({
      type: 'text',
      nullable: true
    })
    description!: string;

    @Column({
        type: 'text',
        nullable: true
    })
    type!: string;
  
    @Column({
      type: 'json',
      nullable: true
    })
    tags!: object;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}