import {Validators, FormBuilder, FormGroup, FormControl, AbstractControl} from '@angular/forms';

export function FormValidation(first?: any): any {
  let validation = first;

  function addValidation(target: any, key: string): void {
    target.addValidation(key, validation);
  }

  return addValidation;
}

export function FormVariable(target?: any, key?: any): any {
  target.addFormVariable(key);
}

export class ValidatableForm {
  validatableFormVariables: string[];
  validatableFormValidators: any;
  validatableFormMessages: any;

  addValidation(key: string, validation: any) {
    if (!this.validatableFormValidators) {
      this.validatableFormValidators = {};
    }
    if (!this.validatableFormValidators[key]) {
      this.validatableFormValidators[key] = []
    }
    this.validatableFormValidators[key].push(validation)
  }

  getValidations(key: string): any[] {
    return this.validatableFormValidators[key];
  }

  addFormVariable(key: string) {
    if (!this.validatableFormVariables) {
      this.validatableFormVariables = [];
    }
    this.validatableFormVariables.push(key);
  }

  getFormVariables(): string[] {
    return this.validatableFormVariables;
  }

  getValidationMessage(key: string, validation: any) {
    return this.validatableFormMessages[key][validation];
  }

  // FormGroupに直接渡すことができるHashを生成します。
  //
  // {
  // 'name': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
  // 'description': ['']
  // });
  toFormGroup(): FormGroup {
    let args = this
      .validatableFormVariables
      .map ((key: string) => { return { 'k': key, 'v': this.validatableFormValidators[key] }; })
      .map ((a: any) => {
        let o = {};
        if (a) {
          o[a['k']] = ['', Validators.compose(a['v'])];
        }
        else {
          o[a['k']] = [''];
        }
        return o;
      })
      .reduce((a: any, e: any) => (<any>Object).assign(a,e));
    return (new FormBuilder()).group(args);
  }
}
