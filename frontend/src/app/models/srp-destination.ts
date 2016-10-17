import {JsonProperty} from '../common/json-property/json-property';

export class SrpDestination {
  @JsonProperty()
  id: number;

  @JsonProperty()
  name: string;

  @JsonProperty('corporation_id')
  corporationId: number;

  @JsonProperty('alliance_id')
  allianceId: number;

  @JsonProperty()
  external: string;

  @JsonProperty()
  description: string;

  @JsonProperty('created_at')
  createdAt: string;

  @JsonProperty('updated_at')
  updatedAt: string;

  constructor(obj?: any) {
    this.id = obj && obj.id;
    this.name = obj && obj.name;
    this.corporationId = obj && obj.corporationId;
    this.allianceId = obj && obj.allianceId;
    this.external = obj && obj.external;
    this.description = obj && obj.description;
    this.createdAt = obj && obj.createdAt;
    this.updatedAt = obj && obj.updatedAt;
  }
}
