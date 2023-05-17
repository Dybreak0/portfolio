export class TerritoryDetails {
  public id: string;
  public name: string;
  public parent?: string;

  constructor(id: string, name: string, parent: string) {
    this.id = id;
    this.name = name;
    this.parent = parent;
  }
}
