import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'formly-field-reference',
	template: `
		<div class="card">
			<div class="card-header">
				{{to['panelLabel'] || to['title'] || to['label']}}
				<button class="btn btn-link ha-panel-action" (click)="add()">Add</button>
			</div>

				<div *ngIf="model.$key">
					<table class="table table-striped table-borderless m-0">
						<tbody>
							<tr *ngFor="let item of data | async; let i = index">
								<td>{{item[to.summaryField]}}</td>
								<td class="as-action-column px-0">
									<button class="mat-icon-button" (click)="edit(item)"><mat-icon>edit</mat-icon></button>
								</td>
								<td class="as-action-column px-0">
									<button class="mat-icon-button" color="warn" (click)="remove(item)"><mat-icon>delete</mat-icon></button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div *ngIf="!model.$key">
					Save this item before adding children
				</div>

		</div>
	`,
	styles: [
		`
			.as-action-column {
				width: 40px;
			}

			.ha-panel-action {
				position: absolute;
				right: 15px;
				top: 5px;
			}
		`
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
