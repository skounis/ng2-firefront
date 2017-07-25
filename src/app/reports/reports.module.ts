import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { ReportsComponent } from './reports.component';
import { SelectConferenceDialog } from './select-conference.dialog';

@NgModule({
	imports: [
		MaterialModule,
		CommonModule,
		FlexLayoutModule,
		ChartsModule
	],
	declarations: [ReportsComponent, SelectConferenceDialog],
	entryComponents: [SelectConferenceDialog]
})
export class ReportsModule {
}
