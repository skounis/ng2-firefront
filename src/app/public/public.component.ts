import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DataService } from '../common/services/data.service';
import { itemsFormConfig } from '../dynamic-form/form.config';
import { FormlyFormEnricher } from '../dynamic-form/formly-form-enricher';
import { ModelProcessor } from '../dynamic-form/model-processor';

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

	private readonly itemType: string;

	constructor(
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private enricher: FormlyFormEnricher,
		private data: DataService,
		private router: Router
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
		let fields: FormlyFieldConfig[] = itemsFormConfig()[this.itemType];
		this.enricher.enrichFields(fields);
		this.fields = fields;
	}
}
