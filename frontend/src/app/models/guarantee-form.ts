import {Validators} from '@angular/forms';
import {FormVariable, FormValidation, ValidatableForm} from '../common/simple-form/validatable-form';
import {JsonProperty} from '../common/json-property/json-property';

export class GuaranteeForm extends ValidatableForm {

  @JsonProperty()
  id: number;

  @JsonProperty()
  shipId: number;

  @JsonProperty()
  shipType: string;

  @JsonProperty()
  shipName: string;

  @JsonProperty()
  price: number;

  @JsonProperty('guarantee_type_id')
  guaranteeTypeId: number;

  @JsonProperty()
  description: string;

  @JsonProperty()
  createdAt: string;

  @JsonProperty()
  updatedAt: string;

  constructor(obj?: any) {
    super();
    this.id = obj && obj.id;
    this.shipId = obj && obj.shipId;
    this.shipType = obj && obj.shipType;
    this.shipName = obj && obj.shipName;
    this.price = obj && obj.price;
    this.guaranteeTypeId = obj && obj.guaranteeTypeId;
    this.description = obj && obj.description;
    this.createdAt = obj && obj.createdAt;
    this.updatedAt = obj && obj.updatedAt;
  }

}
