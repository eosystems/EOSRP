import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {JsonObjectMapper} from '../common/json-property/json-object-mapper';
import {Zkill} from '../models/zkill';

@Injectable()
export class ZkillService {
  constructor (private _http: Http) {
  }

  get(url: string): Observable<Zkill> {
    return this
      ._http
      .get(process.env.API_URL + '/api/zkills?zkill_url=' + url)
      .map(r => r.json())
      .map(r => {
        let form = JsonObjectMapper.deserialize(Zkill, r);
        return form;
      });
  }
}
