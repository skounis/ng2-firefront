import { Location } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostListener, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { DataService } from '../common/services/data.service';
import { uuid } from '../common/uuid';
import { FormlyFormEnricher } from '../dynamic-form/formly-form-enricher';
import { ModelProcessor } from '../dynamic-form/model-processor';
import { DynamicFormLoaderService } from '../dynamic-form/dynamic-form-loader.service';

import { MatDialog } from '@angular/material';
import { NgxUnlayerRestService } from '../common/ngx-unlayer/ngx-unlayer.service';

@Component({
	selector: 'item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements AfterViewInit {
	// Selected Template (Template)
	selectedTemplate = null;

	// The colection of the Designs/Templates created by the user
	// and saved in Firebase
	userTemplates = [];

	selectedTabIndex = 0;

	// TODO: we may need to get rid of these
	isDesignerReady = false;
	isPreviewReady = false;

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

	item: any;
	fields: FormlyFieldConfig[];
	form: FormGroup;
	options: FormlyFormOptions = {
		formState: {
			onFlush: new EventEmitter<void>()
		}
	};


	_options;

	templateOptions: any = {
		className: ''
	};
	itemId: string;
	itemType: string;
	parentId: string;
	parentType: string;
	previewUrl: string;
	fullPreviewUrl: string;

	constructor(
		private fb: FormBuilder,
		private data: DataService,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar,
		private location: Location,
		private formlyConfigLoaderService: DynamicFormLoaderService,
		private enricher: FormlyFormEnricher,
		private dialog: MatDialog,
		private unlayerService: NgxUnlayerRestService,
		private ngZone: NgZone,
	) {
		this.parentType = route.snapshot.params['parentType'];
		this.parentId = route.snapshot.params['parentId'];
		this.itemType = route.snapshot.params['itemsType'];
		this.itemId = route.snapshot.params['id'];

		this.previewUrl = `/preview/${this.itemType}/${this.itemId}`;
		this.fullPreviewUrl = window.location.origin + '/#' + this.previewUrl;

		this.initFormFields();
	}

	ngAfterViewInit(): void {

		setTimeout(() => {
			if (this.itemId) {
				this.data.loadItem(this.itemType, this.itemId)
					.subscribe(item => {
						if (!this.item) {
							this.item = this.convertForUI(item);
						}
						this.prepare();
						this.isDesignerReady = true;
						this.isPreviewReady = true;
					});
			} else {
				this.item = {};
			}

			this.loadDesigns();
		}, 0);
	}

	save() {
		this.options.formState.onFlush.emit();

		let item = this.convertForDB(this.item);
		this.data.saveItem(this.itemType, item)
			.then(
				() => {
					this.form.markAsPristine();

					this.snackBar.open('The changes has been saved', 'Ok', {
						duration: 3000
					});

					if (!this.itemId && item.$key) {
						this.itemId = item.$key;
					}
				},
				(error) => {
					console.log(error);
				}
			);
	}

	cancel() {
		if (!this.itemId) {
			this.location.back();
		} else {
			this.data.loadItem(this.itemType, this.itemId)
				.subscribe(item => {
					this.item = ModelProcessor.convertForUI(item, this.fields);
					this.form.reset(this.item);

					this.snackBar.open('The changes has been canceled', 'Ok', {
						duration: 3000
					});
				});
		}
	}

	private initFormFields() {
		this.form = this.fb.group({});
		let fields: FormlyFieldConfig[] = this.formlyConfigLoaderService.formlyFieldConfig()[this.itemType];
		this.templateOptions.className = this.hasFieldGroup(fields) ? 'as-has-fieldgroup' : '';
		this.enricher.enrichFields(fields);
		this.fields = fields;
	}

	private convertForDB(model: any) {
		model = ModelProcessor.convertForDB(model, this.fields);

		if (this.parentId) {
			model.parentId = this.parentId;
		}
		if (!model.$key) {
			model.$key = this.itemId || uuid();
		}

		return model;
	}

	private convertForUI(model: any) {
		model = ModelProcessor.convertForUI(model, this.fields);
		if (this.parentId) {
			model.parentId = this.parentId;
		}
		if (!model.$key) {
			model.$key = this.itemId;
		}
		return model;
	}

	private hasFieldGroup(items) {
		return !!items.find(item => {
			return !!item.wrappers && item.wrappers.includes('ha-fieldset');
		});
	}

	prepare() {
		let templateData = this.data.patchEntity(this.item);
		this._options = this.mapData(templateData, this.unlayerOptions);
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

	savedSnack() {
		this.ngZone.run(() => {
			this.snackBar.open('The changes has been saved', 'Ok', {
				duration: 3000
			});
		});
	}

	onDesignSave(template: any) {
		if (template.$key) {
			this.data.saveItem('unlayerDesigns', template)
				.then(
					() => {
						this.savedSnack();
						this.selectedTemplate = Object.assign({}, template);
					},
					(error) => {
						console.log(error);
					}
				);
		} else {
			template.name = template.name || Math.random().toString(36).substring(7);

			delete template.id;
			delete template.displayMode;
			delete template.folder;

			this.data.createItem('unlayerDesigns', template)
				.then(
					(key) => {

						console.log(key);
						template.$key = key;

						this.savedSnack();
						this.selectedTemplate = Object.assign({}, template);
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}

	// Load the Desings/Templates of the user
	loadDesigns() {
		this.data.loadItems('unlayerDesigns').subscribe(items => {
			this.userTemplates = items;
		});
	}

	@HostListener('window:beforeunload', ['$event'])
	canDeactivate(): Observable<boolean> | boolean {
		return !this.form.dirty;
	}

	onTemplateSelected(template) {
		this.selectedTemplate = template;
		this.selectedTabIndex = 2;
		console.log(template);
	}
}
