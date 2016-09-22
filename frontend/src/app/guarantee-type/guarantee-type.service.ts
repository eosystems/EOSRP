import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GuaranteeTypeForm} from '../models/guarantee-type-form';
import {Observable} from 'rxjs';
import {JsonObjectMapper} from '../common/json-property/json-object-mapper';

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

  get(id: string): Observable<GuaranteeTypeForm> {
    return this
      ._http
      .get(process.env.API_URL + "/api/guarantee_types/" + id)
      .map(r => r.json())
      .map(r => {
        let form = JsonObjectMapper.deserialize(GuaranteeTypeForm, r);
        return form;
      });
  }

  update(id: string, guaranteeType: GuaranteeTypeForm): any {
    let body = JSON.stringify({
      guarantee_type: {
        name: guaranteeType.name,
        description: guaranteeType.description,
      }
    });
    return this
      ._http
      .put(process.env.API_URL + "/api/guarantee_types/" + id, body);
  }

  destroy(id: string): any {
    return this
      ._http
      .delete(process.env.API_URL + '/api/guarantee_types/' + id);
  }
}
