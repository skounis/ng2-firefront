import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DataService } from '../common/services/data.service';
import { FormlyFormEnricher } from '../dynamic-form/formly-form-enricher';
import { ModelProcessor } from '../dynamic-form/model-processor';
import { DynamicFormLoaderService} from '../dynamic-form/dynamic-form-loader.service';

@Component({
	selector: 'app-public',
	templateUrl: './public.component.html',
	styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
	item: any = {};
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

	private readonly itemType: string;

	constructor(
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private enricher: FormlyFormEnricher,
		private data: DataService,
		private router: Router,
		private formlyConfigLoaderService: DynamicFormLoaderService
	) {
		this.itemType = route.snapshot.params['itemsType'];

		this.initFormFields();
	}

	ngOnInit() {
	}

	submit() {
		this.options.formState.onFlush.emit();

		let item = ModelProcessor.convertForDB(this.item, this.fields);
		this.data.createItem(this.itemType, item)
			.then(
				() => {
					this.form.markAsPristine();

					this.router.navigateByUrl(`/public/thanks/${this.itemType}`);
				},
				(error) => {
					console.log(error);
				}
			);
	}

	clear() {
		this.options.resetModel();
	}

	private initFormFields() {
		this.form = this.fb.group({});
		// let fields: FormlyFieldConfig[] = this.formlyConfigLoaderService.formlyFieldConfig()[this.itemType];
		// this.enricher.enrichFields(fields);
		let fields: FormlyFieldConfig[] = this.formlyConfigLoaderService.formlyFieldConfig()[this.itemType];
		this.templateOptions.className = this.hasFieldGroup(fields) ? 'as-has-fieldgroup' : '';
		this.fields = fields;
	}

	private hasFieldGroup(items) {
		return !!items.find(item => {
			return !!item.wrappers && item.wrappers.includes('ha-fieldset');
		});
	}
}
