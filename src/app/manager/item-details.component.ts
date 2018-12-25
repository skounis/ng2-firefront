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

@Component({
	selector: 'item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements AfterViewInit {
	item: any;
	tabs: any;
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

	constructor(
		private fb: FormBuilder,
		private data: DataService,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar,
		private location: Location,
		private formlyConfigLoaderService: DynamicFormLoaderService,
		private enricher: FormlyFormEnricher
	) {
		this.parentType = route.snapshot.params['parentType'];
		this.parentId = route.snapshot.params['parentId'];
		this.itemType = route.snapshot.params['itemsType'];
		this.itemId = route.snapshot.params['id'];

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
					});
			} else {
				this.item = {};
			}
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
		// <<<<<<< HEAD
		// let fields: FormlyFieldConfig[] = itemsFormConfig()[this.itemType];
		// let fields: FormlyFieldConfig[] = this.collectFields(itemsFormConfig()[this.itemType]);
		let fieldsConfig = this.formlyConfigLoaderService.formlyFieldConfig()[this.itemType]
		let fields: FormlyFieldConfig[] = this.collectFields(fieldsConfig);
		// this.tabs = itemsFormConfig()[this.itemType].tabs; // We may not have tabs but it's OK;
		this.tabs = fieldsConfig.tabs; // We may not have tabs but it's OK;
// =======
// 		let fields: FormlyFieldConfig[] = this.formlyConfigLoaderService.formlyFieldConfig()[this.itemType];
// 		this.templateOptions.className = this.hasFieldGroup(fields) ? 'as-has-fieldgroup' : '';
// >>>>>>> master
		this.enricher.enrichFields(fields);
		this.fields = fields;
	}

	private collectFields(node) {
		if (node.tabs) {
			let fields: FormlyFieldConfig[] = node.tabs.reduce((acc, val) => {
				if (acc.fields) {
					acc = acc.fields;
				}
				return acc.concat(val.fields);
			});
			return fields;
		} else {
			let fields: FormlyFieldConfig[] = node;
			return fields;
		}
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

	@HostListener('window:beforeunload', ['$event'])
	canDeactivate(): Observable<boolean> | boolean {
		return !this.form.dirty;
	}
}
