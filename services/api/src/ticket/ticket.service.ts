import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/user.entity";
import {
  InsertResult,
  Repository,
  UpdateResult,
  FindOptionsSelectByString,
  IsNull,
} from "typeorm";
import { CreateTicketDto } from "./dto";
import { TicketEntity } from "./ticket.entity";

@Injectable()
export class TicketService {
  PUBLIC_FIELDS: FindOptionsSelectByString<TicketEntity> = [
    "id",
    "title",
    "description",
    "resolved",
    "assignedTo",
  ];

  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>
  ) {}

  findById(ticketId: number): Promise<TicketEntity | null> {
    return this.ticketRepository.findOne({
      where: { id: ticketId },
      select: this.PUBLIC_FIELDS,
      relations: { assignedTo: true },
    });
  }

  findActiveTickets() {
    return this.ticketRepository.find({
      where: { resolved: false },
      relations: { assignedTo: true },
      select: this.PUBLIC_FIELDS,
    });
  }

  findTicketByAgentId(agentId: number): Promise<TicketEntity | null> {
    return this.ticketRepository.findOne({
      where: { agentId, resolved: false },
      relations: { assignedTo: true },
      select: this.PUBLIC_FIELDS,
    });
  }

  findUnassignedTicket(): Promise<TicketEntity | null> {
    return this.ticketRepository.findOne({
      where: { agentId: IsNull(), resolved: false },
      select: this.PUBLIC_FIELDS,
    });
  }

  create(ticket: CreateTicketDto): Promise<InsertResult> {
    return this.ticketRepository.insert(ticket);
  }

  async update(
    ticketId: number,
    ticket: Partial<Omit<TicketEntity, "id">>
  ): Promise<UpdateResult> {
    const exists = await this.ticketRepository.exist({
      where: { id: ticketId },
    });

    if (!exists) {
      throw new NotFoundException(
        `Ticket with id ${ticketId} could not be found`
      );
    }

    return this.ticketRepository.update({ id: ticketId }, ticket);
  }

  resolveTicket(ticketId: number): Promise<UpdateResult> {
    return this.update(ticketId, { resolved: true });
  }
}
