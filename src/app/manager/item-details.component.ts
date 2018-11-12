import { Location } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { DataService } from '../common/services/data.service';
import { uuid } from '../common/uuid';
import { itemsFormConfig } from '../dynamic-form/form.config';
import { FormlyFormEnricher } from '../dynamic-form/formly-form-enricher';
import { ModelProcessor } from '../dynamic-form/model-processor';
import { MenuService } from '../common/services/menu.service';

@Component({
	selector: 'item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements AfterViewInit {
	item: any;
	fields: FormlyFieldConfig[];
	form: FormGroup;
	options: FormlyFormOptions = {
		formState: {
			onFlush: new EventEmitter<void>()
		}
	};

	itemId: string;
	itemType: string;
	parentId: string;
	parentType: string;

	itemsTitle: string;

	constructor(
		private fb: FormBuilder,
		private data: DataService,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar,
		private location: Location,
		private enricher: FormlyFormEnricher,
		private menuService: MenuService
	) {
		this.parentType = route.snapshot.params['parentType'];
		this.parentId = route.snapshot.params['parentId'];
		this.itemType = route.snapshot.params['itemsType'];
		this.itemId = route.snapshot.params['id'];

		this.initFormFields();
	}

	ngAfterViewInit(): void {

		// TODO: check with skounis
		setTimeout(() => {
			if (this.itemId) {
				this.menuService.menus.subscribe(menus => {
					const currentMenuItem = menus
						.find(x => x.itemsType === this.itemType);
					this.itemsTitle = currentMenuItem
						? currentMenuItem.title
						: this.itemType;
				});

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

	back() {
		this.location.back();
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
		let fields: FormlyFieldConfig[] = itemsFormConfig()[this.itemType];
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

	@HostListener('window:beforeunload', ['$event'])
	canDeactivate(): Observable<boolean> | boolean {
		return !this.form.dirty;
	}
}
