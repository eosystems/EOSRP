import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GuaranteeTypeForm} from '../models/guarantee-type-form';
import {Observable} from 'rxjs';
import {JsonObjectMapper} from '../common/json-property/json-object-mapper';

@Injectable()
export class GuaranteeService {
  constructor (private _http: Http) {
  }

  all(guaranteeTypeId: string): any {
    return this
      ._http
      .get(process.env.API_URL + "/api/guarantees?id=" + guaranteeTypeId)
      .map(r => r.json())
      .map(r => {
        let form = JsonObjectMapper.deserialize(GuaranteeTypeForm, r);
        return form;
      });
  }
}
