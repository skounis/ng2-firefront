import { Component } from '@angular/core';
import { Field } from '@ngx-formly/core';

@Component({
	selector: 'formly-field-time-picker',
	template: `
		<ngb-timepicker class="ff-timepicker" [formControl]="formControl" [ngClass]="{'form-control-danger': valid}"
			[spinners]="false">
		</ngb-timepicker>
  `,
	styles: [
		`
			/deep/ .ff-timepicker input.form-control {
				min-width: 60px;
			}
		`
	]
})
export class FormlyFieldTimePicker extends Field {
}
