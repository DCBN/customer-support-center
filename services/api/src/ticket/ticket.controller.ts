import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Logger, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AuthenticatedGuard } from 'src/auth/guards';
import { UserService } from 'src/user/user.service';
import { handleError } from 'src/utils';
import { CreateTicketDto } from './dto';
import { TicketCreatedEvent, TICKET_CREATED } from './events/ticketCreated';
import { TicketResolvedEvent, TICKET_RESOLVED } from './events/ticketResolved';
import { TicketService } from './ticket.service';

@Controller('ticket')
@UseGuards(AuthenticatedGuard)
export class TicketController {
    private readonly logger = new Logger(TicketController.name);
    constructor(private readonly ticketService: TicketService, private readonly userService: UserService, private readonly eventEmitter: EventEmitter2) {}

    @Post()
    async createTicket(@Body() body: CreateTicketDto) {
        try {
            const { raw: createdId } = await this.ticketService.create(body);
            this.eventEmitter.emit(TICKET_CREATED, new TicketCreatedEvent(createdId))
            return {
                id: createdId
            };
        } catch (err) {
            this.logger.error(err);
            return handleError(err, 'Ticket could not be created')
        }
    }

    @Get('/agent/:agentId')
    async getAssignedTicket(@Param('agentId') agentId: number) {
        try {
            const ticket = await this.ticketService.findTicketByAgentId(agentId);
            return {
                ticket
            }
        } catch (err) {
            return handleError(err, `Ticket for agent ${agentId} could not be found`);
        }
    }

    @Get('/active')
    async getActiveTickets() {
        try {
            const activeTickets = await this.ticketService.findActiveTickets();
            return {
                activeTickets
            }
        } catch (err) {
            return handleError(err);
        }
    }

    @Get('/:id')
    async getTicket(@Param('id') id: number) {
        try {
            const ticket = await this.ticketService.findById(id);
            return {
                ticket
            }
        } catch (err) {
            throw handleError(err, `Ticket with id ${id} could not be resolved`);
        }
    }

    @Put('/:id/resolve')
    async resolveTicket(@Param('id') id: number) {
        const ticket = await this.ticketService.findById(id);

        if (!ticket) {
            throw new NotFoundException(`Ticket with id ${id} could not be found,`);
        }

        try {
            await this.ticketService.resolveTicket(id);
            
            if (ticket.assignedTo) {
                this.eventEmitter.emit(TICKET_RESOLVED, new TicketResolvedEvent(ticket.assignedTo.id))
            }

            return {
                id: ticket.id
            }

        } catch (err) {
            throw handleError(err);
        }
    }

    @OnEvent(TICKET_CREATED)
    async assignFreeAgentToTicket(payload: TicketCreatedEvent) {
        this.logger.log(`Attempting to find agent for ticket ${payload.ticketId}`)
        const agent = await this.userService.findUnassignedAgent();

        if (!agent) {
            return;
        }

        try {
            await this.ticketService.update(payload.ticketId, { agentId: agent.id });
            this.logger.log(`Assigned agent ${agent.id} to ticket ${payload.ticketId}`)
        } catch (err) {
           this.logger.error(`Error occurred while trying to assign agent ${agent.id} to ticket ${payload.ticketId}`);
           this.logger.error((err as Error).message);
        }
    }

    @OnEvent(TICKET_RESOLVED)
    async assignAgentToTicket(payload: TicketResolvedEvent) {
        this.logger.log(`Attempting to find ticket for agent: ${payload.agentId}`);
        const ticket = await this.ticketService.findUnassignedTicket();

        if (!ticket) {
            this.logger.log('No unassigned tickets found');
            return;
        }

        try {
            await this.ticketService.update(ticket.id, { agentId: payload.agentId });
            this.logger.log(`Assigned agent ${payload.agentId} to ticket ${ticket.id}`);
        } catch (err) {
            this.logger.error(`Error occurred while trying to assign agent ${payload.agentId} to ticket ${ticket.id}`);
            this.logger.error((err as Error).message);
         }
    }
}
