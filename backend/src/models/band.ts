import { v4 as uuidv4 } from "uuid";

export class Band {
  public id: string;
  public name: string;
  public votes: number;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
    this.votes = 0;
  }

}
