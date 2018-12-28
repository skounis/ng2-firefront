import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';

@Component({
	selector: 'formly-field-input',
	template: `
		<input matInput
			[errorStateMatcher]="errorStateMatcher"
			[readonly]="to.readonly"
			[placeholder]="placeholder"
			[textMask]="{mask: mask}"
			[formControl]="formControl"
			[formlyAttributes]="field">
	`
})
export class FormlyFieldNumericInput extends FieldType {

	get placeholder() {
		return this.to.placeholder || this.to.label;
	}

	get mask() {
		let mask = Object.assign({}, this.to.mask, {
			prefix: '',
			includeThousandsSeparator: false
		});
		return createNumberMask(mask);
	}
}
