import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {SrpApprovalForm} from '../models/srp-approval-form';
import {Observable} from 'rxjs';
import {JsonObjectMapper} from '../common/json-property/json-object-mapper';
import {SrpApproval} from '../models/srp-approval';

@Injectable()
export class SrpApprovalService {
  constructor (private _http: Http) {
  }

  all(): Observable<Array<SrpApproval>> {
    return this
      ._http
      .get(process.env.API_URL + '/api/srp_approvals')
      .map(r => r.json())
      .map(r => {
        let results = r['results']
          .map(g => JsonObjectMapper.deserialize(SrpApproval, g));
        return results;
      });
  }

  get(id: string): Observable<SrpApprovalForm> {
    return this
      ._http
      .get(process.env.API_URL + "/api/srp_approvals/" + id)
      .map(r => r.json())
      .map(r => {
        let form = JsonObjectMapper.deserialize(SrpApprovalForm, r);
        return form;
      });
  }

  update(srpApproval: SrpApprovalForm): any {
    let body = JSON.stringify({
      srp_approval: {
        price: srpApproval.price,
        guarantee_type_id: srpApproval.guaranteeTypeId,
        manager_comment: srpApproval.managerComment
      }
    });
    return this
      ._http
      .put(process.env.API_URL + "/api/srp_approvals/" + srpApproval.id, body);
  }

}
