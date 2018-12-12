import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'unlayer-dialog',
	templateUrl: 'unlayer.dialog.html',
	styleUrls: ['unlayer.dialog.scss']
})
export class UnlayerDialog {

	constructor(@Inject(MAT_DIALOG_DATA) public data) {}

}