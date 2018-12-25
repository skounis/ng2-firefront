import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';

@Component({
	selector: 'formly-field-input',
	styles: [
		`
			.wrapper {
				width: 100%;
			}
		`
	],
	template: `
	<mat-form-field class="wrapper">
		<input matInput [textMask]="{mask: mask}" [formControl]="formControl"
			[formlyAttributes]="field" [ngClass]="{'form-control-danger': valid}">
	</mat-form-field>
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
