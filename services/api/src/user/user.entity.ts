import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRole {
  CUSTOMER = "customer",
  SUPPORT_AGENT = "support_agent",
  ADMIN = "admin",
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column("varchar")
  role: UserRole;

  @Column("varchar")
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
