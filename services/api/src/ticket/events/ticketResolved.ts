export const TICKET_RESOLVED = 'TICKET_RESOLVED';

export class TicketResolvedEvent {
    constructor(public readonly agentId: number) {}
}