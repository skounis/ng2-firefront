import { Injectable } from '@angular/core';
import { DataService } from '../common/services/data.service';
import { ModelProcessor } from '../dynamic-form/model-processor';
import { itemsFormConfig } from '../dynamic-form/form.config';
import { take, map } from 'rxjs/operators';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable()

export class DynamicFormLoaderService {
	private configKey: string = 'formConfig';
	// TODO: This is a collection of arrays of FormlyFieldConfig
	// we may improve this structure or define a type for it.
	// private formlyConfig: FormlyFieldConfig;
	private formlyConfig: any;

	constructor(private dataService: DataService) {
	}

	// async init() {
	// 	let config = await this.dataService.loadItems(this.configKey)
	// 		.pipe(take(1))
	// 		.toPromise();
	//
	// 	this.formlyConfig = {
	// 		...itemsFormConfig(),
	// 		...ModelProcessor.convertFormConfigForUI(config)
	// 	};
	// }

	load() {
		return this.dataService.loadItems(this.configKey)
			.pipe(
				take(1),
				map(data => {
					this.formlyConfig = {
						...itemsFormConfig(),
						...ModelProcessor.convertFormConfigForUI(data)
					};
					console.log('Dynamic form config initialized.');
					return this.formlyConfig;
				})
			)
			.toPromise();
	}

	formlyFieldConfig(): FormlyFieldConfig {
		return this.formlyConfig;
	}

}
