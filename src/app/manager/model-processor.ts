import { FormlyFieldConfig } from '@ngx-formly/core';

export class ModelProcessor {
	static convertForUI(model: any, fields: FormlyFieldConfig[]): any {
		model = JSON.parse(JSON.stringify(model));

		let processField = (item: any, fieldConfig: FormlyFieldConfig) => {
			if (fieldConfig.type === 'date-time-picker' && item[fieldConfig.key]) {
				item[fieldConfig.key] = new Date(item[fieldConfig.key]);
			}
		};

		fields.forEach(x => {
			processField(model, x);

			if (x.fieldGroup) {
				let localItem = x.key ? model[x.key] : model;
				if (localItem) {
					x.fieldGroup.forEach(field => processField(localItem, field));
				}
			}

			if (x.fieldArray && x.fieldArray.fieldGroup) {
				let localItems: any[] = x.key ? model[x.key] : model;
				if (localItems) {
					localItems.forEach(localItem => {
						x.fieldArray.fieldGroup.forEach(field => processField(localItem, field));
					});
				}
			}
		});
		return model;
	}

	static convertForDB(model: any, fields: FormlyFieldConfig[]): any {
		model = JSON.parse(JSON.stringify(model));

		let processField = (item: any, fieldConfig: FormlyFieldConfig) => {
			switch (fieldConfig.type) {
				case 'date-time-picker':
					if (item[fieldConfig.key]) {
						if (item[fieldConfig.key].getTime) {
							item[fieldConfig.key] = item[fieldConfig.key].getTime();
						} else if (typeof item[fieldConfig.key] === 'string') {
							item[fieldConfig.key] = new Date(item[fieldConfig.key]).getTime();
						}
					}
					break;
				case 'numeric-input':
					if (fieldConfig.templateOptions.mask.allowDecimal) {
						item[fieldConfig.key] = parseFloat(item[fieldConfig.key]);
					} else {
						item[fieldConfig.key] = parseInt(item[fieldConfig.key], 10);
					}
					if (isNaN(item[fieldConfig.key]) || item[fieldConfig.key] === '') {
						item[fieldConfig.key] = null;
					}
					break;
				default:
					break;
			}

			if (item[fieldConfig.key] === undefined) {
				item[fieldConfig.key] = null;
			}
		};

		fields.forEach(x => {
			processField(model, x);

			if (x.fieldGroup) {
				let localItem = x.key ? model[x.key] : model;
				if (localItem) {
					x.fieldGroup.forEach(field => processField(localItem, field));
				}
			}

			if (x.fieldArray && x.fieldArray.fieldGroup) {
				let localItems: any[] = x.key ? model[x.key] : model;
				if (localItems) {
					localItems.forEach(localItem => {
						x.fieldArray.fieldGroup.forEach(field => processField(localItem, field));
					});
				}
			}
		});

		return model;
	}
}