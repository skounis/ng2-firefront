import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEditorComponent } from './form-editor.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { ToolbarModule } from '../../common/toolbar/toolbar.module';
import { MatSnackBarModule, MatButtonModule } from '@angular/material';

@NgModule({
	declarations: [FormEditorComponent],
	imports: [
		CommonModule,
		NgJsonEditorModule,
		ToolbarModule,
		MatSnackBarModule,
		MatButtonModule
	],
	exports: [
		FormEditorComponent
	]
})
export class FormEditorModule {
}
