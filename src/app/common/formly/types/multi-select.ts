import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable, from } from 'rxjs';

@Component({
	selector: 'formly-field-multi-select',
	template: `
		<mat-select [formControl]="formControl" class="form-control" [formlyAttributes]="field" [multiple]="to.multiple">
			<mat-option *ngFor="let item of dataSource | async" [value]="item[valueProp]">{{item[labelProp]}}</mat-option>
		</mat-select>
	`
})
export class FormlyFieldMultiSelect extends FieldType {
	get labelProp(): string {
		return this.to['labelProp'] || 'label';
	}

	get valueProp(): string {
		return this.to['valueProp'] || 'value';
	}

	get dataSource(): any {
		if (this.to.staticValues) {
			return new Observable<Array<any>>(observable => {
				observable.next(this.to.staticValues);
			});
		} else {
			return this.to.dataSource;
		}
	}
}
