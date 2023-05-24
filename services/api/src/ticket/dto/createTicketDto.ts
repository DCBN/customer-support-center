import { MinLength, MaxLength } from 'class-validator';

export class CreateTicketDto {
    @MinLength(1)
    @MaxLength(50)
    title: string;

    @MinLength(10)
    @MaxLength(256)
    description: string;
}