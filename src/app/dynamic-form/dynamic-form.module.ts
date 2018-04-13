import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { SharedModule } from '../common/shared.module';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormlyFormEnricher } from './formly-form-enricher';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyModule,
		CKEditorModule,
		AgmCoreModule
	],
	exports: [DynamicFormComponent],
	declarations: [DynamicFormComponent],
	entryComponents: [],
	providers: [FormlyFormEnricher]
})
export class DynamicFormModule {
}
