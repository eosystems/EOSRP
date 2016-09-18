import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'new-guarantee-type',
  templateUrl: './new-guarantee-type.template.html'
})

export class NewGuaranteeType {
  typeForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.typeForm = fb.group({
      'name': ['', Validators.required],
      'description': ['']
    });
  }
}
