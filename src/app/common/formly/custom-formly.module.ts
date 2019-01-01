import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigOption, FormlyModule } from '@ngx-formly/core';
import { ManipulatorOption, TypeOption, WrapperOption } from '@ngx-formly/core/lib/services/formly.config';
import { TextMaskModule } from 'angular2-text-mask';
import { CKEditorModule } from 'ng2-ckeditor';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SharedModule } from '../shared.module';
import { TemplateWarningWrapper } from './run/warning';
import { FormlyFieldCheck } from './types/check';
import { FormlyFieldCoords } from './types/coordinates/coords';
import { EditCoordsDialog } from './types/coordinates/edit-coords.dialog';
import { FormlyFieldDatePicker } from './types/date-picker';
import { FormlyFieldDateTimePicker } from './types/date-time-picker';
import { FormlyFieldHtml } from './types/html';
import { FormlyMasterDetails } from './types/master-details/master-details';
import { FormlyFieldMultiCheckbox } from './types/multi-checkbox';
import { FormlyFieldMultiSelect } from './types/multi-select';
import { FormlyFieldNumericInput } from './types/numeric-input';
import { EditHoursDialog } from './types/open-hours/edit-hours.dialog';
import { FormlyFieldOpenHours } from './types/open-hours/open-hours';
import { FormlyFieldReference } from './types/reference/reference';
import { FormlyFieldRepeater } from './types/repeater';
import { CKEditorDialog } from './types/rich-text-editor/ckeditor.dialog';
import { FormlyFieldRichText } from './types/rich-text-editor/rich-text';
import { FormlyFieldText } from './types/text';
import { FormlyFieldTimePicker } from './types/time-picker';
import { FormlyFieldFileUpload } from './types/upload/file-upload';
import { FormlyPanelWrapper } from './wrappers/panel';
import { FormlyFieldsetWrapper } from './wrappers/fieldset';
import { FormlyWrapperWarning, FormlyWrapperWarningMessage } from './wrappers/warning';
import { ValidationService } from './validation.service';

const types: TypeOption[] = [
	{
		name: 'numeric-input',
		component: FormlyFieldNumericInput,
		wrappers: ['form-field']
	},
	{
		name: 'date-time-picker',
		component: FormlyFieldDateTimePicker,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'date-picker',
		component: FormlyFieldDatePicker,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'time-picker',
		component: FormlyFieldTimePicker,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'file-upload',
		component: FormlyFieldFileUpload,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'rich-text',
		component: FormlyFieldRichText,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'html',
		component: FormlyFieldHtml
	},
	{
		name: 'check',
		component: FormlyFieldCheck
	},
	{
		name: 'multi-select',
		component: FormlyFieldMultiSelect,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'multi-checkbox',
		component: FormlyFieldMultiCheckbox,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'coords',
		component: FormlyFieldCoords,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'open-hours',
		component: FormlyFieldOpenHours,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'reference',
		component: FormlyFieldReference,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'repeater',
		component: FormlyFieldRepeater
	},
	{
		name: 'text',
		component: FormlyFieldText,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'master-details',
		component: FormlyMasterDetails
	}
];

const manipulators: ManipulatorOption[] = [
	{ class: TemplateWarningWrapper, method: 'run' }
];

const wrappers: WrapperOption[] = [
	{ name: 'warning-wrapper', component: FormlyWrapperWarning },
	{ name: 'warning-message', component: FormlyWrapperWarningMessage },
	{ name: 'panel', component: FormlyPanelWrapper },
	{ name: 'ha-fieldset', component: FormlyFieldsetWrapper }
];


const validators = [
	{ name: 'invalidEmailAddress', validation: ValidationService.emailValidator },
	{ name: 'invalidUrl', validation: ValidationService.urlValidator },
	{ name: 'prefixError', validation: ValidationService.prefixValidator },
	{ name: 'other', message: (err, field) => err }
];

const validationMessages = [
	{ name: 'required', message: ValidationService.getValidatorErrorMessage('required') },
	{ name: 'invalidEmailAddress', message: ValidationService.getValidatorErrorMessage('invalidEmailAddress') },
	{ name: 'invalidUrl', message: ValidationService.getValidatorErrorMessage('invalidUrl') },
	{ name: 'prefixError', message: ValidationService.getValidatorErrorMessage('prefixError') }
];

export const ngFormlyConfig: ConfigOption = {
	types: types,
	manipulators: manipulators,
	wrappers: wrappers
};

@NgModule({
	imports: [
		FormlyModule.forChild({
			validationMessages: [...validationMessages],
			validators: [...validators]
		}),
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		NgbModule,
		CKEditorModule,
		MatSelectModule,
		AgmCoreModule,
		SharedModule,
		CalendarModule,
		MatProgressSpinnerModule,
		TextMaskModule
	],
	exports: [],
	declarations: [
		FormlyFieldRepeater,
		FormlyFieldTimePicker,
		FormlyFieldDatePicker,
		FormlyFieldDateTimePicker,
		FormlyFieldFileUpload,
		FormlyFieldRichText,
		FormlyFieldCheck,
		FormlyFieldHtml,
		FormlyWrapperWarning,
		FormlyWrapperWarningMessage,
		CKEditorDialog,
		EditCoordsDialog,
		FormlyFieldMultiSelect,
		FormlyFieldCoords,
		FormlyFieldOpenHours,
		EditHoursDialog,
		FormlyPanelWrapper,
		FormlyFieldsetWrapper,
		FormlyFieldReference,
		FormlyFieldMultiCheckbox,
		FormlyFieldNumericInput,
		FormlyFieldText,
		FormlyMasterDetails
	],
	entryComponents: [CKEditorDialog, EditCoordsDialog, EditHoursDialog],
	providers: []
})
export class CustomFormlyModule {
}
