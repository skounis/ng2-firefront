import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../common/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'preview',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.scss']
})

export class PreviewComponent implements OnInit {
	html = null;

	constructor(
		private dataService: DataService,
		private sanitizer: DomSanitizer,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		const { id, itemsType } = this.route.snapshot.params;

		this.dataService.loadItem(itemsType, id)
			.subscribe(item => {
				if (item) {
					this.html = atob(item.encodedHTML);
				}
			});
	}

	sanitazeHtml(value) {
		return this.sanitizer.bypassSecurityTrustHtml(value);
	}
}
