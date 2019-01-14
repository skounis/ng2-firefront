import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormConfigDetailComponent } from './form-config-detail.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { ToolbarModule } from '../../common/toolbar/toolbar.module';
import { MatSnackBarModule, MatButtonModule } from '@angular/material';

@NgModule({
	declarations: [FormConfigDetailComponent],
	imports: [
		CommonModule,
		NgJsonEditorModule,
		ToolbarModule,
		MatSnackBarModule,
		MatButtonModule
	],
	exports: [
		FormConfigDetailComponent
	]
})
export class FormConfigDetailModule {
}
