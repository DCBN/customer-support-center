import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { TicketController } from './ticket.controller';
import { TicketEntity } from './ticket.entity';
import { TicketService } from './ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([ TicketEntity ]), UserModule],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}
