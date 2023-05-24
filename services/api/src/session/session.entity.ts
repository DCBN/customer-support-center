import { ISession } from "connect-typeorm";
import { Column, DeleteDateColumn, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
export class SessionEntity implements ISession {
    @Index()
    @Column("bigint", { default: Date.now() })
    expiredAt: number;

    @PrimaryColumn("varchar", { length: 255 })
    id: string;

    @Column("text")
    json:string;

    @DeleteDateColumn()
    destroyedAt?: Date;
}