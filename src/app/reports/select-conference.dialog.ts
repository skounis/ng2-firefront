import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth/services/auth.service';
import { DataService } from '../common/services/data.service';

@Component({
	selector: 'select-conference-dialog',
	templateUrl: './select-conference.dialog.html',
	styleUrls: ['./select-conference.dialog.scss']
})
export class SelectConferenceDialog {
	private conferences$: FirebaseListObservable<any[]>;

	constructor(
		private dialogRef: MdDialogRef<SelectConferenceDialog>,
		private data: DataService,
		private auth: AuthService
	) {
		let userId = this.auth.roles.indexOf('admin') < 0 ? this.auth.id : null;
		this.conferences$ = this.data.loadConferences(userId);
	}

	select(conference) {
		this.dialogRef.close(conference);
	}

	cancel() {
		this.dialogRef.close();
	}
}