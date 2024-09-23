import { v7 as uuid } from "uuid";

export class Ticket {
  id: string;
  number: number;
  desktop: string | null;
  agent: string | null;

  constructor(number: number) {
    this.id = uuid();
    this.number = number;
    this.desktop = null;
    this.agent = null;
  }
}
