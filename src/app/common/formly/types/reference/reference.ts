import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'formly-field-reference',
	templateUrl: './reference.html',
	styleUrls: ['./reference.scss']
})

export class FormlyFieldReference extends FieldType {
	private _data: Observable<any[]>;

	get data() {
		if (!this._data) {
			this._data = this.to.load(this.to.collection, this.model.$key);
		}
		return this._data;
	}

	constructor() {
		super();
	}

	add() {
		this.to.add(this.to.parentCollection, this.model.$key, this.to.collection);
		return false;
	}

	edit(item) {
		this.to.edit(this.to.parentCollection, this.model.$key, this.to.collection, item.$key);
		return false;
	}

	remove(item: any) {
		this.to.remove(this.to.collection, item);
		return false;
	}
}
