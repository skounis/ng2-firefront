import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { DataService } from '../../common/services/data.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ModelProcessor } from '../../dynamic-form/model-processor';
import { Location } from '@angular/common';

@Component({
	selector: 'form-config-details',
	templateUrl: './form-config-detail.component.html',
	styleUrls: ['./form-config-detail.component.scss']
})
export class FormConfigDetailComponent implements OnInit {

	public editorOptions: JsonEditorOptions;
	public data: any;
	public isEditorDirty = false;
	public itemId: string;
	public itemType: string = 'formConfig';

	@ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

	constructor(
		private ref: ChangeDetectorRef,
		private dataService: DataService,
		private snackBar: MatSnackBar,
		private route: ActivatedRoute,
		private location: Location
	) {
		this.editorOptions = new JsonEditorOptions();
		this.editorOptions.onChange = () => {
			this.isEditorDirty = true;
		}
		this.editorOptions.modes = ['code', 'tree'];
		this.itemId = route.snapshot.params['id'];
	}

	ngOnInit() {
		this.loadFormlyConfig();

	}

	save() {
		let data: any = this.editor.get();
		data.$key = this.itemId ? this.itemId : null;
		this.dataService.saveItem('formConfig', data)
			.then(
				() => {

					this.snackBar.open('The changes has been saved', 'Ok', {
						duration: 3000
					});
					this.isEditorDirty = false;
				},
				(error) => {
					console.log(error);
				}
			);
	}


	cancel() {
		if (!this.itemId) {
			this.location.back();
		} else {
			this.snackBar.open('The changes has been canceled', 'Ok', {
				duration: 3000
			});
			this.loadFormlyConfig();
			this.isEditorDirty = false;
		}
	}

	private loadFormlyConfig() {
		if (this.itemId) {
			this.dataService.loadItem(this.itemType, this.itemId)
				.subscribe((config) => {
					this.data = {	...config };
					this.editor.setName(this.itemId);
				});

		} else {
			this.data = {};
		}
	}

}
