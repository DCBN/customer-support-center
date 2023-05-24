import { IsEmail, MaxLength, MinLength } from "class-validator";

export class SignInDto {
    @IsEmail()
    email: string;
    
    @MinLength(8)
    @MaxLength(25)
    password: string;
}