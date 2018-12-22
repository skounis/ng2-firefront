import { Component, OnChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgxUnlayerRestService } from './ngx-unlayer.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'ngx-unlayer-preview',
	templateUrl: './ngx-unlayer-preview.component.html',
	styleUrls: ['./ngx-unlayer-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxUnlayerPreviewComponent implements OnChanges {

	@Input() design;
	@Input() options;

	html: string = null;
	isHtmlReady: boolean = false;

	constructor(
		private cdRef: ChangeDetectorRef,
		private restService: NgxUnlayerRestService,
		private sanitizer: DomSanitizer,
	) {
	}

	ngOnChanges() {
		this.renderHTML(this.design, this.options);
	}

	sanitazeHtml(value) {
		return this.sanitizer.bypassSecurityTrustHtml(value);
	}

	private renderHTML(design, options) {
		this.isHtmlReady = false;
		this.restService.render({ design, options }).subscribe((resp: any) => {
			if (resp && resp.html) {
				this.isHtmlReady = true;
				this.html = resp.html;
			}
			this.cdRef.detectChanges();
		}, (err) => {
			this.isHtmlReady = true;
		});
	}

}
