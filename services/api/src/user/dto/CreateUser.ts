import { IsEmail, IsEnum, MaxLength, MinLength } from "class-validator";
import { UserRole } from "../user.entity";

export class CreateUserDto {
    @MinLength(5)
    @MaxLength(100)
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(UserRole)
    role: UserRole;

    @MinLength(8)
    @MaxLength(25)
    password: string;
}