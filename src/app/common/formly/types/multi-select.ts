import { Component } from '@angular/core';
import { FieldType } from 'ng-formly';

@Component({
	selector: 'formly-field-multi-select',
	template: `
		<md-select [formControl]="formControl" class="form-control" [formlyAttributes]="field" [multiple]="to.multiple">
			<md-option *ngFor="let item of to.dataSource | async" [value]="item[valueProp]">{{item[labelProp]}}</md-option>
		</md-select>
	`
})
export class FormlyFieldMultiSelect extends FieldType {
	get labelProp(): string {
		return this.to['labelProp'] || 'label';
	}

	get valueProp(): string {
		return this.to['valueProp'] || 'value';
	}
}
