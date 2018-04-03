import { Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
	selector: 'formly-wrapper-panel',
	encapsulation: ViewEncapsulation.None,
	template: `
		<div class="card form-group">
			<div class="card-header">
				{{to['title'] || to['label']}}
				<button type="button" class="arrows" mat-icon-button *ngIf="to['expandable']" (click)="expanded = !expanded">
					<mat-icon *ngIf="!expanded">keyboard_arrow_down</mat-icon>
					<mat-icon *ngIf="expanded">keyboard_arrow_up</mat-icon>
				</button>
			</div>
			<div class="card-block" [ngClass]="{ 'collapse': !expanded }">
				<ng-container #fieldComponent></ng-container>
			</div>
		</div>
	`,
	styles: [
		`
			.arrows {
				position: absolute;
				right: 15px;
				width: 24px;
				height: 24px;
				line-height: 24px;
				padding-left: 0;
			}
		`
	]
})
export class FormlyPanelWrapper extends FieldWrapper {
	expanded = true;
	@ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}