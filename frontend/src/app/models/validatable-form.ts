export function FormValidation(first?: any): any {
  let validation = first;

  function addValidation(target: any, key: string): void {
    target.addValidation(key, validation);
  }

  return addValidation;
}

export class ValidatableForm {
  validatableFormValidators: any;

  constructor() {
  }

  addValidation(key: string, validation: any) {
    if (!this.validatableFormValidators) {
      this.validatableFormValidators = {};
    }
    if (!this.validatableFormValidators[key]) {
      this.validatableFormValidators[key] = []
    }
    this.validatableFormValidators[key].push(validation)
  }
}
