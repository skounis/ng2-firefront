import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../auth/services/auth.service';
import { DataService } from '../common/services/data.service';

@Component({
	selector: 'select-conference-dialog',
	templateUrl: './select-conference.dialog.html',
	styleUrls: ['./select-conference.dialog.scss']
})
export class SelectConferenceDialog {
	constructor(
		private dialogRef: MatDialogRef<SelectConferenceDialog>,
		private data: DataService,
		private auth: AuthService
	) {
		let userId = this.auth.roles.indexOf('admin') < 0 ? this.auth.id : null;
	}

	select(conference) {
		this.dialogRef.close(conference);
	}

	cancel() {
		this.dialogRef.close();
	}
}