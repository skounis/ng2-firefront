import { NgModule } from '@angular/core';
import { ConfirmDialog } from './dialogs/confirm.dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderBy } from './pipes/order-by.pipe';


@NgModule({
	imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
	exports: [OrderBy],
	declarations: [ConfirmDialog, OrderBy],
	entryComponents: [ConfirmDialog],
	providers: []
})
export class SharedModule {
}
