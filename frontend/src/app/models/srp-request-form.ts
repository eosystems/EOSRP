import {Validators} from '@angular/forms';
import {FormVariable, FormValidation, ValidatableForm} from '../common/simple-form/validatable-form';
import {JsonProperty} from '../common/json-property/json-property';

export class SrpRequestForm extends ValidatableForm {
  @JsonProperty()
  id: number;

  @JsonProperty()
  @FormVariable
  @FormValidation(Validators.required)
  @FormValidation(Validators.maxLength(255))
  zkillUrl: string;

  @JsonProperty()
  @FormVariable
  @FormValidation(Validators.maxLength(255))
  requestComment: string;

  constructor(obj?: any) {
    super();

    this.id = obj && obj.id;
    this.zkillUrl = obj && obj.zkillUrl;
    this.requestComment = obj && obj.requestComment;
  }
}
