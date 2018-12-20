import { Location } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostListener } from '@angular/core';
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
import { NewItemDialog } from './new-item.dialog';
import { NgxUnlayerRestService } from '../common/ngx-unlayer/ngx-unlayer.service';

@Component({
	selector: 'item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements AfterViewInit {

	// The colection of the Designs/Templates created by the user
	// and saved in Firebase
	userDesigns = [];
	// ID of the current/selected design/template (in the future we should use a store for this)
	userDesignID = null;

	selectedDesign = null;
	selectedTabIndex = 0;

	// TODO: we may need to get rid of these
	isDesignerReady = false;
	isPreviewReady = false;

	unlayerOptions = {
		projectId: 1556,
		// templateId: 4449,
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
		private unlayerService: NgxUnlayerRestService
	) {
		this.parentType = route.snapshot.params['parentType'];
		this.parentId = route.snapshot.params['parentId'];
		this.itemType = route.snapshot.params['itemsType'];
		this.itemId = route.snapshot.params['id'];

		this.previewUrl = `/preview/${this.itemType}/${this.itemId}`;
		this.fullPreviewUrl = window.location.href + this.previewUrl;

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


	_options;

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

	onDesignSave(design: any) {
		if(!!this.selectedDesign) {
			let item:any = {
				name: this.userDesignID,
				design: design,
				$key: this.selectedDesign.$key
			}
	
			// Turn undefined values into null
			// Firebase can't serialize `undefined`
			item = JSON.parse(JSON.stringify(item, function(k, v) {
				if (v === undefined) { return null; } return v;
			}));

			this.data.saveItem('unlayerDesigns', item)
				.then(
					() => {
						this.snackBar.open('The changes has been saved', 'Ok', {
							duration: 3000
						});
	
						if (!this.itemId && item.$key) {
							this.itemId = item.$key;
						}
						this.selectedDesign = item;
					},
					(error) => {
						console.log(error);
					}
				);
		} else {
				let dialogRef = this.dialog.open(NewItemDialog, {
					width: '300px'
				});
				dialogRef.afterClosed().subscribe(itemName => {
					if (itemName) {
						this.userDesignID = itemName;
					}
						this.userDesignID = this.userDesignID || Math.random().toString(36).substring(7);
						let item:any = {
							name: this.userDesignID,
							design: design
						}
				
						// Turn undefined values into null
						// Firebase can't serialize `undefined`
						item = JSON.parse(JSON.stringify(item, function(k, v) {
							if (v === undefined) { return null; } return v;
						}));
			
					this.data.createItem('unlayerDesigns', item)
					.then(
						() => {
		
							this.snackBar.open('The changes has been saved', 'Ok', {
								duration: 3000
							});
							this.selectedDesign = item;
							if (!this.itemId && item.$key) {
								this.itemId = item.$key;
							}
						},
						(error) => {
							console.log(error);
						}
					);
				});
		}
	}

	// Load the Desings/Templates of the user
	loadDesigns() {
		this.data.loadItems('unlayerDesigns').subscribe(items => {
			this.userDesigns = items;
		});
	}

	@HostListener('window:beforeunload', ['$event'])
	canDeactivate(): Observable<boolean> | boolean {
		return !this.form.dirty;
	}

	onTemplateSelected(templateData: any) {
		if(templateData.type === 'systemTemplate') {
			this.selectedDesign = null;
			this.userDesignID = null;
			this._options['templateId'] = templateData.template.id;
		} else {
			this.userDesignID = templateData.template.name;
			this.selectedDesign = templateData.template;
		}
		this.selectedTabIndex = 2;
	}
}
