import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'about',
	styleUrls: ['./about.component.scss'],
	templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

	public localState: any;

	constructor(
		public route: ActivatedRoute
	) {
	}

	public ngOnInit() {
		this.route
			.data
			.subscribe((data: any) => {
				// your resolved data from route
				this.localState = data.yourData;
			});

		console.log('hello `About` component');
		// static data that is bundled
		// var mockData = require('assets/mock-data/mock-data.json');
		// console.log('mockData', mockData);
		// if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
		this.asyncDataWithWebpack();
	}

	private asyncDataWithWebpack() {

	}

}
