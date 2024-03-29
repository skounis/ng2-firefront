import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
	selector: 'formly-repeat-section',
	template: `
    <div class="jumbotron" style="padding: 2rem 1.5rem;" *ngFor="let control of formControl.controls; let i = index;">
			<div style="float: right;">
				<button class="btn btn-danger" (click)="remove(i)">
					<i style="vertical-align: top;" class="material-icons">delete</i>
				</button>
			</div>
      <formly-form
        [model]="model[i]"
        [fields]="fields(i)"
        [options]="newOptions"
        [form]="this.formControl.at(i)"
        [ngClass]="field.fieldArray.className">
      </formly-form>
    </div>
    <div>
      <button type="button" class="btn btn-primary  btn-block" (click)="add()" style="min-width: 80px;">Add</button>
    </div>
  `
})
export class FormlyFieldRepeater extends FieldType implements OnInit {
	formControl: FormArray;
	_fields = [];

	constructor(private builder: FormlyFormBuilder) {
		super();
	}

	get newOptions() {
		return Object.assign({}, this.options);
	}

	get newFields() {
		return JSON.parse(JSON.stringify(this.field.fieldArray.fieldGroup));
	}

	ngOnInit() {
		if (this.model) {
			this.model.map(() => this.add());
		}
	}

	add() {
		const form = new FormGroup({}),
			i = this._fields.length;

		if (!this.model[i]) {
			this.model.push({});
			this.form.markAsDirty();
		}

		this._fields.push(this.newFields);
		this.builder.buildForm(form, this._fields[i], this.model[i], this.newOptions);
		this.formControl.push(form);
	}

	remove(i) {
		this.formControl.removeAt(i);
		this.model.splice(i, 1);
		this._fields.splice(i, 1);
		this.form.markAsDirty();
	}

	fields(i) {
		if (this._fields[i]) {
			return this._fields[i];
		}

		this._fields.splice(i, 0, this.newFields);

		return this._fields[i];
	}
}
