import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TicketEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    resolved: boolean;

    @Column({ nullable: true, default: undefined })
    agentId?: number;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: "agentId" })
    assignedTo?: UserEntity;
}