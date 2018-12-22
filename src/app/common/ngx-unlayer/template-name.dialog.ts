import { MatDialogRef } from '@angular/material';

import { Component } from '@angular/core';
@Component({
	selector: 'template-name-dialog',
	templateUrl: 'template-name.dialog.html',
	styleUrls: ['template-name.dialog.scss']
})
export class TemplateNameDialog {
	itemName: string = '';

	constructor(private dialogRef: MatDialogRef<TemplateNameDialog>) {}

	create() {
		this.dialogRef.close(this.itemName);
	}

	cancel() {
		this.dialogRef.close();
	}
}
