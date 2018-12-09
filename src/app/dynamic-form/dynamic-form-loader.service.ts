import { Injectable } from '@angular/core';
import { DataService } from '../common/services/data.service';
import { ModelProcessor } from '../dynamic-form/model-processor';
import { itemsFormConfig } from '../dynamic-form/form.config';
import { take } from 'rxjs/operators';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable()

export class DynamicFormLoaderService {
	private configKey: string = 'formConfig';
	private formlyConfig: FormlyFieldConfig;

	constructor(private dataService: DataService) {
	}

	async init() {
		let config = await this.dataService.loadItems(this.configKey)
			.pipe(take(1))
			.toPromise();

		this.formlyConfig = {
			...itemsFormConfig(),
			...ModelProcessor.convertFormConfigForUI(config)
		};
	}

	formlyFieldConfig(): FormlyFieldConfig {
		return this.formlyConfig;
	}

}
