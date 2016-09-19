import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GuaranteeTypeForm} from '../models/guarantee-type-form';

@Injectable()
export class GuaranteeTypeService {
  constructor (private _http: Http) {
  }

  create(guaranteeType: GuaranteeTypeForm) : any {
    let body = JSON.stringify({
      guarantee_type: {
        name: guaranteeType.name,
        description: guaranteeType.description
      }
    });
    return this
      ._http
      .post(process.env.API_URL + "/api/guarantee_types", body);
  }
}
