import {Validators} from '@angular/forms';
import {FormVariable, FormValidation, ValidatableForm} from '../common/simple-form/validatable-form';
import {JsonProperty} from '../common/json-property/json-property';

export class SrpRequestForm extends ValidatableForm {
  @JsonProperty()
  id: number;

  @JsonProperty('zkill_url')
  @FormVariable
  @FormValidation(Validators.required)
  @FormValidation(Validators.maxLength(255))
  zkillUrl: string;

  @JsonProperty('request_comment')
  @FormVariable
  @FormValidation(Validators.maxLength(255))
  requestComment: string;

  @JsonProperty('zkill_valuation')
  @FormVariable
  @FormValidation(Validators.maxLength(255))
  zkillValuation: string;

  @JsonProperty()
  @FormVariable
  @FormValidation(Validators.maxLength(255))
  price: number;

  @JsonProperty('manager_comment')
  @FormVariable
  @FormValidation(Validators.maxLength(255))
  managerComment: string;

  @JsonProperty('srp_destination_id')
  @FormVariable
  srpDestinationId: number;

  constructor(obj?: any) {
    super();

    this.id = obj && obj.id;
    this.zkillUrl = obj && obj.zkillUrl;
    this.requestComment = obj && obj.requestComment;
    this.zkillValuation = obj && obj.zkillValuation;
    this.price = obj && obj.price;
    this.managerComment = obj && obj.managerComment;
    this.srpDestinationId = obj && obj.srpDestinationId;

  }
}
