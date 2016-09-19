import {Validators} from '@angular/forms';
import {FormVariable, FormValidation, ValidatableForm} from '../common/simple-form/validatable-form';
import {JsonProperty} from '../common/json-property/json-property';

export class GuaranteeTypeForm extends ValidatableForm {
  @JsonProperty()
  id: number;

  @JsonProperty()
  @FormVariable
  @FormValidation(Validators.required)
  @FormValidation(Validators.maxLength(255))
  name: string;

  @JsonProperty()
  @FormVariable
  @FormValidation(Validators.maxLength(255))
  description: string;

  constructor(obj?: any) {
    super();

    this.id = obj && obj.id;
    this.name = obj && obj.name;
    this.description = obj && obj.description;
  }
}

