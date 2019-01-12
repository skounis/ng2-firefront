import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { DataService } from '../../common/services/data.service';
import { ModelProcessor } from '../../dynamic-form/model-processor';
import { take, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'form-editor',
	templateUrl: './form-editor.component.html',
	styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {

	public editorOptions: JsonEditorOptions;
	public data: any;
	public isEditorDirty = false;

	@ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

	constructor(
		private ref: ChangeDetectorRef,
		private dataService: DataService,
		private snackBar: MatSnackBar
	) {
		this.editorOptions = new JsonEditorOptions();
		this.editorOptions.onChange = () => {
			this.isEditorDirty = true;
		}
		this.editorOptions.modes = ['code', 'tree'];
	}

	ngOnInit() {
		this.loadFormlyConfig();

	}

	save() {
		let data = this.editor.get();
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

	private loadFormlyConfig() {
		this.dataService.loadItems('formConfig')
			.pipe(
				take(1),
				map(config => {
					this.data = {
						...ModelProcessor.convertFormConfigForUI(config)
					};
				})
			)
			.toPromise();
	}

}
