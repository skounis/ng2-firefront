import { Component, OnChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgxUnlayerRestService } from './ngx-unlayer.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'ngx-unlayer-preview',
	templateUrl: './ngx-unlayer-preview.component.html',
	styleUrls: ['./ngx-unlayer-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxUnlayerPreviewComponent implements OnChanges {

	@Input() design;
	@Input() options;

	html: string = null;
	isHtmlReady: boolean = false;

	// Default options
	unlayerOptions = {
		// projectId: 1556,
		// templateId: 4449,
		tools: {
		// 	image: {
		// 		enabled: false,
		// 	},
		// 	'custom#subscribe_button': {
		// 		enabled: true,
		// 		priority: 2,
		// 		data: {
		// 			url: 'http://via.placeholder.com/350x150',
		// 		}
		// 	},
		// 	'custom#sessions': {
		// 		enabled: true,
		// 		priority: 1,
		// 		data: {
		// 			sessions: [
		// 				{ name: 'Session 1', date: '18-10-2018' },
		// 				{ name: 'Session 2', date: '18-10-2018' },
		// 				{ name: 'Session 3', date: '18-10-2018' }
		// 			]
		// 		}
		// 	}
		},
		displayMode: 'email',
		designTags: {

		},
		mergeTags: {
			'[[eventName]]': 'xxxxx 1.1.1.1',
			eventName: 'xxxxx 1',
			testTag: 'xxxxx 2',
		}
	};


	constructor(
		private cdRef: ChangeDetectorRef,
		private restService: NgxUnlayerRestService,
		private sanitizer: DomSanitizer,
	) {
	}

	ngOnChanges() {

		this.renderHTML(this.design, this.unlayerOptions);
		// this.renderHTML(this.design, this.options);
	}

	sanitazeHtml(value) {
		return this.sanitizer.bypassSecurityTrustHtml(value);
	}

	private renderHTML(design, options) {
		// let options = { ...this.mapData(options, this.unlayerOptions) };
		// debugger;
		this.isHtmlReady = false;
		this.restService.render({ design, options }).subscribe((resp: any) => {
			if (resp && resp.html) {
				this.isHtmlReady = true;
				this.html = resp.html;
			}
			this.cdRef.detectChanges();
		}, (err) => {
			this.isHtmlReady = true;
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


}
