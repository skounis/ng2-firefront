import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NgxUnlayerStore {
  private _templatesList;

  get templatesList() {
    return this._templatesList;
  }

  set templatesList(list) {
    this._templatesList = list;
  }

}
