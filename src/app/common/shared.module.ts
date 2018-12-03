import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDialogModule,
	MatFormFieldModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatSelectModule, MatSidenavModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatButtonToggleModule
} from '@angular/material';
import { ConfirmDialog } from './dialogs/confirm.dialog';
import { OrderBy } from './pipes/order-by.pipe';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, ToolbarModule],
	exports: [
		OrderBy,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatIconModule,
		MatCardModule,
		MatListModule,
		MatToolbarModule,
		MatGridListModule,
		MatCheckboxModule,
		MatRadioModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatTableModule,
		MatTabsModule,
		MatMenuModule,
		MatChipsModule,
		MatButtonModule,
		MatDialogModule,
		MatInputModule,
		MatFormFieldModule,
		MatSidenavModule,
		ToolbarModule,
		MatButtonToggleModule
	],
	declarations: [ConfirmDialog, OrderBy],
	entryComponents: [ConfirmDialog],
	providers: []
})
export class SharedModule {
}
