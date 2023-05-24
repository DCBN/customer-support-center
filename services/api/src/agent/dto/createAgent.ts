import { IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateAgentDto {
    @MinLength(5)
    @MaxLength(100)
    name: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    @MaxLength(25)
    password: string;
}