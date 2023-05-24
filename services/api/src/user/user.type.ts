import { UserEntity } from "./user.entity";

export type PublicUser = Omit<UserEntity, 'password' | 'createdAt' | 'updatedAt' | 'deletedAt'>