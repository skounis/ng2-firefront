import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';

@Component({
	selector: 'formly-field-input',
	template: `
		<input [textMask]="{mask: mask}" [formControl]="formControl" class="form-control"
			[formlyAttributes]="field" [ngClass]="{'form-control-danger': valid}">
	`
})
export class FormlyFieldNumericInput extends FieldType {
	get mask() {
		let mask = Object.assign({}, this.to.mask, {
			prefix: '',
			includeThousandsSeparator: false
		});
		return createNumberMask(mask);
	}
}
