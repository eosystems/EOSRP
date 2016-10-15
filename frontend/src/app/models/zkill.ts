import {JsonProperty} from '../common/json-property/json-property';

export class Zkill {
  @JsonProperty()
  characterID: number;

  @JsonProperty()
  characterName: string;

  @JsonProperty()
  shipTypeID: number;

  @JsonProperty()
  totalValue: number;

  @JsonProperty()
  shipName: string;

  @JsonProperty()
  killTime: string;

  constructor(obj?: any) {
    this.characterID = obj && obj.characterID;
    this.characterName = obj && obj.characterName;
    this.shipTypeID = obj && obj.shipTypeID;
    this.totalValue = obj && obj.totalValue;
    this.shipName = obj && obj.shipName;
    this.killTime = obj && obj.killTime;
  }
}
