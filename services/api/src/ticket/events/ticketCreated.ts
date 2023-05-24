export const TICKET_CREATED = 'TICKET_CREATED';

export class TicketCreatedEvent {
    constructor(public readonly ticketId: number) {}
}