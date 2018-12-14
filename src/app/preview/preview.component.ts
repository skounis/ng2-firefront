import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ModelProcessor } from '../dynamic-form/model-processor';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DynamicFormLoaderService } from '../dynamic-form/dynamic-form-loader.service';

@Component({
	selector: 'preview',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

	unlayerOptions = {
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
					sessions: []
				}
			}
		},
		designTags: {}
	};

	options;

	constructor(
		private dataService: DataService,
		private formlyConfigLoaderService: DynamicFormLoaderService,
		private route: ActivatedRoute
	) {
	}

	ngOnInit() {
		const { id, itemsType } = this.route.snapshot.params;

		this.dataService.loadItem(itemsType, id)
			.subscribe(item => {
				if (item) {
					let fields: FormlyFieldConfig[] = this.formlyConfigLoaderService.formlyFieldConfig()[itemsType];
					let templateData = this.convertForUI(item, fields);
					this.options = this.mapData(templateData, this.unlayerOptions);
				}
			});
	}


	private mapData(emailData, options) {
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
						options.designTags[key] = `<img src="${emailData[key]}" style="max-width: 100%; heigth: auto;" >`;
						break;
					}
					case 'date':
						if (!options.designTags) {
							options.designTags = null;
						}
						options.designTags['eventDateShort'] = new Date(emailData[key]);
						options.designTags['eventDateLong'] = emailData[key];
						break;
					case 'description':
						if (!options.designTags) {
							options.designTags = null;
						}
						options.designTags['eventDescription'] = emailData[key];
						break;
					case 'location':
						if (!options.designTags) {
							options.designTags = null;
						}
						options.designTags['eventLocation'] = emailData[key];
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

	private convertForUI(model: any, fields) {

		model = ModelProcessor.convertForUI(model, fields);
		if (this.parentId) {
			model.parentId = this.parentId;
		}
		if (!model.$key) {
			model.$key = this.itemId;
		}
		return model;
	}

}
