import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
	selector: 'confirm-dialog',
	templateUrl: 'confirm.dialog.html',
	styleUrls: ['confirm.dialog.scss']
})
export class ConfirmDialog {
	title: string;
	message: string;

	constructor(private dialogRef: MdDialogRef<ConfirmDialog>, @Inject(MD_DIALOG_DATA) private data: any) {
		if (data) {
			this.title = data.title;
			this.message = data.message;
		}
	}

	ok() {
		this.dialogRef.close('OK');
	}

	cancel() {
		this.dialogRef.close();
	}
}