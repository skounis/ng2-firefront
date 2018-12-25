import { Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
	selector: 'formly-wrapper-fieldset',
	encapsulation: ViewEncapsulation.None,
	template: `
		<h5 *ngIf="to['title'] || to['label']" class="as-fieldset-header">{{to['title'] || to['label']}}</h5>
		<div class="as-fieldset-wrapper mat-card">
			<div>
				<ng-container #fieldComponent></ng-container>
			</div>
		</div>
	`,
	styles: [
		`
			formly-wrapper-fieldset h5 {
				padding-left: 10px;
			}

			formly-wrapper-fieldset .as-fieldset-wrapper {
				margin-bottom: 40px;
			}
		`
	]
})
export class FormlyFieldsetWrapper extends FieldWrapper {
	@ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}
