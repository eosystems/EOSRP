import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {JsonObjectMapper} from '../common/json-property/json-object-mapper';
import {SrpDestination} from '../models/srp-destination';

@Injectable()
export class SrpDestinationService {
  constructor (private _http: Http) {
  }

  all(): Observable<Array<SrpDestination>> {
    return this
      ._http
      .get(process.env.API_URL + '/api/srp_destinations')
      .map(r => r.json())
      .map(r => {
        let results = r['results']
          .map(g => JsonObjectMapper.deserialize(SrpDestination, g));
        return results;
      });
  }
}
