import {Injectable} from '@angular/core';
import {Guarantee} from '../models/guarantee';

@Injectable()
export class GuaranteeSharedService {
  private _guarantees: Array<Guarantee>;

  constructor() {
    this._guarantees = new Array<Guarantee>();
  }

  setGuarantees(guarantees: Array<Guarantee>): void {
    this._guarantees = guarantees;
  }

  getGuarantees(): Array<Guarantee> {
    return this._guarantees;
  }
}
