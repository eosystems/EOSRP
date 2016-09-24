export class Guarantee {
  id: number;
  shipId: number;
  shipType: string;
  shipName: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;

  constructor(obj?: any) {
    this.id = obj && obj.id;
    this.shipId = obj && obj.shipId;
    this.shipType = obj && obj.shipType;
    this.shipName = obj && obj.shipName;
    this.price = obj && obj.price;
    this.description = obj && obj.description;
    this.createdAt = obj && obj.createdAt;
    this.updatedAt = obj && obj.updatedAt;
  }
}
