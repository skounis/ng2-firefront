import { Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
	selector: 'formly-wrapper-fieldset',
	encapsulation: ViewEncapsulation.None,
	template: `
		<h3>Fieldset: {{to['title'] || to['label']}}</h3>
		<div class="card">
			<div class="card-block">
				<ng-container #fieldComponent></ng-container>
			</div>
		</div>
	`,
	styles: [
		`
			.h3 {
				color: red;
			}
		`
	]
})
export class FormlyFieldsetWrapper extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}
