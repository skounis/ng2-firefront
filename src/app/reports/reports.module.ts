import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../common/shared.module';
import { ReportsComponent } from './reports.component';
import { SelectConferenceDialog } from './select-conference.dialog';

@NgModule({
	imports: [
		SharedModule,
		CommonModule,
		FlexLayoutModule,
		ChartsModule
	],
	declarations: [ReportsComponent, SelectConferenceDialog],
	entryComponents: [SelectConferenceDialog]
})
export class ReportsModule {
}
