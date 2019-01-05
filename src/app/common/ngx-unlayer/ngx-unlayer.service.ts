import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { environment } from '../../../environments/environment';

@Injectable()
export class NgxUnlayerRestService {

	endpoint = environment.unlayer.endpointUrl;

	headers = new HttpHeaders({
		'Authorization': ` Basic ${btoa(environment.unlayer.token)}`
	});

	constructor(public http: HttpClient,  public datepipe: DatePipe) {
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

	render(data) {
		return this.http.post(`${this.endpoint}/render`, data, { headers: this.headers });
	}

	initialOptions() {
		const options = {
			projectId: 1556,
			templateId: 4449,
			tools: {
				image: {
					enabled: false,
				},
				'custom#subscribe_button': {
					enabled: true,
					priority: 2,
					data: {
						url: 'http://via.placeholder.com/350x150',
					}
				},
				'custom#sessions': {
					enabled: true,
					priority: 1,
					data: {
						sessions: [
							{ name: 'Session 1', date: '18-10-2018' },
							{ name: 'Session 2', date: '18-10-2018' },
							{ name: 'Session 3', date: '18-10-2018' }
						]
					}
				}
			},
			designTags: {}
		};
		return options;
	}

	mapData(emailData, options) {
		let keys = Object.keys(emailData);
		let tools: any = { ...options.tools };
		keys.forEach((key) => {
				switch (key) {
					case 'sessions': {
						if (!tools['custom#sessions']) {
							tools['custom#sessions'] = { data: null };
						}

						let data = Object.assign({}, tools['custom#sessions'].data, { title: 'Agenda', sessions: emailData[key] });

						tools['custom#sessions'].data = data;
						break;
					}
					case 'registerURL': {
						if (!tools['custom#subscribe_button']) {
							tools['custom#subscribe_button'] = { data: null };
						}

						let data = Object.assign({}, tools['custom#subscribe_button'].data, { text: 'Register', url: emailData[key] });

						tools['custom#subscribe_button'].data = data;
						break;
					}
					case 'sponsors': {
						if (!tools['custom#sponsors']) {
							tools['custom#sponsors'] = { data: null };
						}
						let data = Object.assign({}, tools['custom#sponsors'].data, { title: 'Our sponsors', sponsors: emailData[key] });

						tools['custom#sponsors'].data = data;
						break;
					}
					case 'companyLogo': {
						if (!options.designTags) {
							options.designTags = null;
						}
						options.designTags[key] = `<img src="${emailData[key]}" style="max-width: 200px; heigth: auto;" >`;
						break;
					}
					case 'date':
						if (!options.designTags) {
							options.designTags = null;
						}
						const date = new Date(emailData[key]);
						options.designTags['eventDateShort'] = this.datepipe.transform(date, 'MMMM d, yyyy');
						options.designTags['eventDateLong'] = this.datepipe.transform(date, 'long');
						break;
					case 'description':
						if (!options.designTags) {
							options.designTags = null;
						}
						options.designTags['eventDescription'] = emailData[key];
						break;
					case 'template':
						options['templateId'] = emailData[key];
						break;
					case 'title':
						if (!options.designTags) {
							options.designTags = null;
						}
						options.designTags['eventName'] = emailData[key];
						break;
					default:
						if (!options.designTags) {
							options.designTags = null;
						}
						options.designTags[key] = emailData[key];
						break;
				}
			}
		);
		return options;
	}

}
