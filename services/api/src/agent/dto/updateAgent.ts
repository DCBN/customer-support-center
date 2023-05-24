import { IsEmail, MaxLength, MinLength } from "class-validator";

export class UpdateAgentDto {
    @MinLength(5)
    @MaxLength(100)
    name: string;

    @IsEmail()
    email: string;
}