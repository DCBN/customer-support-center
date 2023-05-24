import { SupportAgent } from "./supportAgent";

export interface Ticket {
    id: number;
    title: string;
    description: string;
    resolved: boolean;
    assignedTo?: SupportAgent;
}