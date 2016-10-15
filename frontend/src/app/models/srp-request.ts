import {JsonProperty} from '../common/json-property/json-property';

export class SrpRequest {
  @JsonProperty()
  id: number;

  @JsonProperty()
  zkillUrl: string;

  @JsonProperty()
  requestComment: string;

  constructor(obj?: any) {
    this.id = obj && obj.id;
    this.zkillUrl = obj && obj.zkillUrl;
    this.requestComment = obj && obj.requestComment;
  }
}
