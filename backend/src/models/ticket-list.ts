import { Ticket } from "./ticket";

export class TicketList {
  private lastNumber: number;
  private pending: Ticket[];
  private assigned: Ticket[];

  constructor() {
    this.lastNumber = 0;
    this.pending = [];
    this.assigned = [];
  }

  get nextNumber() {
    return ++this.lastNumber;
  }

  get last13() {
    return this.assigned.slice(0, 13);
  }

  makeTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pending.push(newTicket);
    return newTicket;
  }

  assignTicket(agent: string, desktop: string) {
    if (this.pending.length === 0) {
      return null;
    }

    const nextTicket = this.pending.shift();
    if (nextTicket) {
      nextTicket.agent = agent;
      nextTicket.agent = agent;
      nextTicket.desktop = desktop;
      this.assigned.unshift(nextTicket);
      return nextTicket;
    }

    return null;
  }
}
