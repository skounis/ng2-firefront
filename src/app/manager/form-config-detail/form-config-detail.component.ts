import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { DataService } from '../../common/services/data.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'form-config-details',
	templateUrl: './form-config-detail.component.html',
	styleUrls: ['./form-config-detail.component.scss']
})
export class FormConfigDetailComponent implements OnInit {

	public editorOptions: JsonEditorOptions = new JsonEditorOptions();
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
		this.editorOptions.onChange = () => {
			this.isEditorDirty = true;
		};

		this.itemId = route.snapshot.params['id'];
	}

	ngOnInit() {
		this.loadFormlyConfig();
		this.setEditorOptions();
	}

	setEditorOptions() {
		this.editorOptions.modes = ['code', 'tree'];
		this.editorOptions['templates'] = [
			{
				text: 'FieldItem',
				value: {
					key: 'title',
					templateOptions: {
						label: 'Field Label',
						description: 'Field description ....',
						required: true
					},
					type: 'input'
				}
			},
			{
				text: 'Options for Input',
				field: 'templateOptions',
				value: {
					rows: 5,
					label: 'Body',
					description: 'Please enter at least 150 characters',
					required: true
				}
			},
			{
				text: 'Options for Textarea',
				field: 'templateOptions',
				value: {
					rows: 5,
					label: 'Body',
					description: 'Please enter at least 150 characters',
					required: true
				}
			},
			{
				text: 'Options for File Upload',
				field: 'templateOptions',
				value: {
					label: 'Product pictures',
					storage: 'FIRE',
					disabled: true,
					filetype: 'image/*',
					buttonLabel: 'Upload',
					maxFiles: 3,
					width: '250px',
					height: '250px'
				}
			},
			{
				text: 'Options for Datepicker',
				field: 'templateOptions',
				value: {
					label: 'Date',
					placeholder: 'DD/MM/YYYY'
				}
			},
			{
				text: 'Options for Reference',
				field: 'templateOptions',
				value: {
					label: 'News',
					panelLabel: 'News',
					description: 'News posted for this Business',
					parentCollection: 'businesses',
					collection: 'news',
					summaryField: 'title'
				}
			},
			{
				text: 'Options for Numeric Input',
				field: 'templateOptions',
				value: {
					label: 'Price (int)',
					required: true,
					mask: {
						allowDecimal: false
					}
				}
			},
			{
				text: 'Options for Repeater',
				field: 'templateOptions',
				value: {
					title: 'Extra options',
					expandable: true
				}
			},
			{
				text: 'Options for Check',
				field: 'templateOptions',
				value: {
					label: 'This option is pre-selected'
				}
			},
			{
				text: 'Options for Multiselect',
				field: 'templateOptions',
				value: {
					multiple: true,
					label: 'Color',
					labelProp: 'title',
					valueProp: '$key',
					collection: 'colors'
				}
			}
		];

		this.editorOptions['onCreateMenu'] = (items, path) => {
			items.map((item) => {
				if (item.text === 'Insert' || item.text === 'Append') {
					let index = item.submenu.findIndex((el) => el.text === 'FieldItem') + 1;
					item.submenu.splice(index, 0, { type: 'separator' });
				}
			});
			return items;
		};

		this.editorOptions['autocomplete'] = {
			getOptions: function (text, path, input, editor) {
				let item = path.pop();
				if (item === 'type') {
					return ['input', 'textarea', 'datepicker', 'reference', 'numeric-input', 'repeater', 'check', 'file-upload', 'multi-select'];
				}
				return null;
			}
		};
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
					this.data = { ...config };
					this.editor.setName(this.itemId);
				});

		} else {
			this.data = {};
		}
	}

}
