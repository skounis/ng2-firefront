import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-thanks',
	templateUrl: './thanks.component.html',
	styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {
	submitAgainLink: string;

	constructor(private route: ActivatedRoute) {
		let itemType = route.snapshot.params['itemsType'];
		this.submitAgainLink = `#/public/${itemType}`;
	}

	ngOnInit() {
	}

}
