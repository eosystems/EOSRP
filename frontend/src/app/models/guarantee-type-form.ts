import {Validators} from '@angular/forms';
import {FormValidation, ValidatableForm} from './validatable-form';

export class GuaranteeTypeForm extends ValidatableForm {
  id: number;

  @FormValidation(Validators.required)
  @FormValidation(Validators.maxLength(255))
  name: string;

  @FormValidation(Validators.maxLength(255))
  description: number;

  constructor(obj?: any) {
    super();

    this.id = obj && obj.id;
    this.name = obj && obj.name;
    this.description = obj && obj.description;
  }
}

