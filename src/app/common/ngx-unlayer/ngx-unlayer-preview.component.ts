import { Component, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Options, Template } from './ngx-unlayer.model';

declare var unlayer: any;

@Component({
	selector: 'ngx-unlayer-preview',
	templateUrl: './ngx-unlayer-preview.component.html',
	styleUrls: ['./ngx-unlayer-preview.component.scss'],
})
export class NgxUnlayerPreviewComponent implements AfterViewInit {

	@Input() options: Options = null;
	@Input() template: Template;


	html: string = null;
	isHtmlReady: boolean = false;

	constructor(
		private cdRef: ChangeDetectorRef,
		private sanitizer: DomSanitizer,
	) {
	}

	ngAfterViewInit() {
		const options: Options = Object.assign({}, this.options);

		setTimeout(() => {
			// unlayer not able to get access to dom inside this hook
			if (this.template.design) {
				delete options.projectId;
				delete options.templateId;
			}

			unlayer.init({
				...options,
				className: 'editor',
				displayMode: 'email'
			});


			if (this.template.design) {
				this.loadDesign(this.template.design);
			}

			unlayer.addEventListener('design:updated', function (data) {
				this.html = null;
			});

			unlayer.addEventListener('design:loaded', (data) => {
				this.isHtmlReady = false;
				this.exportHTML();
			});

		}, 0);

	}

	loadDesign(design) {
		unlayer.loadDesign(design);
	}

	sanitazeHtml(value) {
		return this.sanitizer.bypassSecurityTrustHtml(value);
	}

	exportHTML() {
		unlayer.exportHtml((data) => {
			this.html = data.html;
			console.log(data);
			this.cdRef.detectChanges();
			window.dispatchEvent(new Event('resize'));
			this.isHtmlReady = true;
			console.log(this, 'ready');
		});
	}


}
