import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import '../../../node_modules/chart.js/src/chart.js';
import { SelectConferenceDialog } from './select-conference.dialog';

@Component({
	selector: 'reports',
	styleUrls: ['./reports.component.scss'],
	templateUrl: './reports.component.html'
})
export class ReportsComponent {
	monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	a = '350/450';
	b = '100 / 350';
	c = '90 / 350';

	tiles = [
		{
			text: '350/450 ePosters submitted - 80% of expected ePosters (View all Submitted)',
			cols: 1,
			rows: 1,
			color: '#fafafa'
		},
		{
			text: '100/350 ePosters submitted this week - 32% of submitted ePosters (View Submitted this week)',
			cols: 1,
			rows: 1,
			color: '#fafafa'
		},
		{
			text: '90/350 ePosters submitted today - 28% of submitted ePosters (View Submitted today)',
			cols: 1,
			rows: 1,
			color: '#fafafa'
		},
		{
			text: 'Last reminder to authors - A reminder was last sent on September 11, 2015, 13:00 (View email sent)',
			cols: 1,
			rows: 1,
			color: '#fafafa'
		},
		{
			text: 'Next reminder to authors - A reminder is scheduled for September 12, 2015, 13:00 (View email to be sent)',
			cols: 2,
			rows: 1,
			color: '#fafafa'
		}
	];

	conference: any;

	get daysBeforeDeadline() {
		if (!this.conference || !this.conference.submissionEndDate) {
			return null;
		}
		let end = this.conference.submissionEndDate;

		let deadline = new Date(end.year, end.month - 1, end.day);
		let now = new Date();
		return Math.floor((deadline.getTime() - now.getTime()) / 1000 / 60 / 60 / 24);
	}

	constructor(private dialog: MatDialog) {
	}

	selectConference() {
		let dialogRef = this.dialog.open(SelectConferenceDialog, {
			width: '300px'
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.conference = result;
			}
		});
	}
}
