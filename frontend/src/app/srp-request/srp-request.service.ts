import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {SrpRequestForm} from '../models/srp-request-form';
import {Observable} from 'rxjs';
import {JsonObjectMapper} from '../common/json-property/json-object-mapper';
import {SrpRequest} from '../models/srp-request';

@Injectable()
export class SrpRequestService {
  constructor (private _http: Http) {
  }

  all(): Observable<Array<SrpRequest>> {
    return this
      ._http
      .get(process.env.API_URL + '/api/srp_requests')
      .map(r => r.json())
      .map(r => {
        let results = r['results']
          .map(g => JsonObjectMapper.deserialize(SrpRequest, g));
        return results;
      });
  }

  create(srpRequest: SrpRequestForm) : any {
    let body = JSON.stringify({
      srp_request: {
        name: srpRequest.zkillUrl,
        description: srpRequest.requestComment
      }
    });
    return this
      ._http
      .post(process.env.API_URL + "/api/srp_requests", body);
  }

  get(id: string): Observable<SrpRequestForm> {
    return this
      ._http
      .get(process.env.API_URL + "/api/srp_requests/" + id)
      .map(r => r.json())
      .map(r => {
        let form = JsonObjectMapper.deserialize(SrpRequestForm, r);
        return form;
      });
  }

  update(id: string, srpRequest: SrpRequestForm): any {
    let body = JSON.stringify({
      srp_request: {
        name: srpRequest.zkillUrl,
        description: srpRequest.requestComment,
      }
    });
    return this
      ._http
      .put(process.env.API_URL + "/api/srp_requests/" + id, body);
  }

  destroy(id: string): any {
    return this
      ._http
      .delete(process.env.API_URL + '/api/srp_requests/' + id);
  }
}
