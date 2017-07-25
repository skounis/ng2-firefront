import { Component } from '@angular/core';
import { Field } from 'ng-formly';

@Component({
	selector: 'formly-field-html',
	template: `
		<div [innerHTML]="to['content']"></div>
	`,
})
export class FormlyFieldHtml extends Field {
}
