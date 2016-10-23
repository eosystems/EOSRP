import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GuaranteeTypeForm} from '../models/guarantee-type-form';
import {Observable} from 'rxjs';
import {JsonObjectMapper} from '../common/json-property/json-object-mapper';
import {Guarantee} from '../models/guarantee';
import {GuaranteeForm} from '../models/guarantee-form';

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

  get_default_price(shipId: number, guaranteeTypeId: number): Observable<GuaranteeForm> {
    return this
      ._http
      .get(process.env.API_URL + "/api/guarantees/guarantee_price_by_ship_and_guarantee_type?ship_id=" + shipId + "&guarantee_type_id=" + guaranteeTypeId)
      .map(r => r.json())
      .map(r => {
        let form = JsonObjectMapper.deserialize(GuaranteeForm, r);
        return form;
      });
  }

  get_default_setting(shipId: number, srpDestinationId: number): Observable<GuaranteeForm> {
    return this
      ._http
      .get(process.env.API_URL + "/api/guarantees/default_srp?ship_id=" + shipId + "&srp_destination_id=" + srpDestinationId)
      .map(r => r.json())
      .map(r => {
        let form = JsonObjectMapper.deserialize(GuaranteeForm, r);
        return form;
      });
  }

  bulkUpdate(guarantees: Array<Guarantee>): any {
    let values = guarantees.map(g => {
      return {
        id: g.id,
        price: g.price,
        description: g.description
      };
    })
    let body = JSON.stringify({
      guarantees: values
    });

    return this
      ._http
      .put(process.env.API_URL + '/api/guarantees/update_all', body);
  }
}
