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

    @Column({ type: 'date' })
    start_date!: Date;
    
    @Column({ type: 'date', nullable: true })
    completed_date!: Date;

    @Column({ type: 'date', nullable: true })
    deadline_date!: Date;

    @Column({
        type: 'json',
        nullable: true
    })
    tags!: object;

    @Column({
        type: 'text',
        nullable: true
    })
    type!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}