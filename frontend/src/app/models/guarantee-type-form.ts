import {Validators} from '@angular/forms';
import {FormVariable, FormValidation, ValidatableForm} from '../common/simple-form/validatable-form';

export class GuaranteeTypeForm extends ValidatableForm {
  id: number;

  @FormVariable
  @FormValidation(Validators.required)
  @FormValidation(Validators.maxLength(255))
  name: string;

  @FormVariable
  @FormValidation(Validators.maxLength(255))
  description: number;

  constructor(obj?: any) {
    super();

    this.id = obj && obj.id;
    this.name = obj && obj.name;
    this.description = obj && obj.description;
  }
}

