import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class NgxUnlayerRestService {

  endpoint = environment.unlayer.endpointUrl;

  headers = new HttpHeaders({
    'Authorization': ` Basic ${btoa(environment.unlayer.token)}`
  });

  constructor(public http: HttpClient) {
  }

  getTemplates() {
    return this.http.get(`${this.endpoint}/templates`, { headers: this.headers });
  }

  getTemplate(id: number) {
    return this.http.get(`${this.endpoint}/templates/${id}`, { headers: this.headers });
  }

  renderTemplate(id: number) {
    return this.http.post(`${this.endpoint}/templates/${id}/render`, null, { headers: this.headers });
  }

  render(design) {
    return this.http.post(`${this.endpoint}/render`, design, { headers: this.headers });
  }


}
