import { Component } from '@angular/core';
import { Field } from '@ngx-formly/core';

@Component({
	selector: 'formly-field-text',
	template: `
		<p class="text-muted">{{model[key]}}</p>
	`,
})
export class FormlyFieldText extends Field {
}
