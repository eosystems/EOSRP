import {JsonProperty} from '../common/json-property/json-property';

export class GuaranteeType {
  @JsonProperty()
  id: number;

  @JsonProperty()
  name: string;

  @JsonProperty()
  description: string;

  constructor(obj?: any) {
    this.id = obj && obj.id;
    this.name = obj && obj.name;
    this.description = obj && obj.description;
  }
}
