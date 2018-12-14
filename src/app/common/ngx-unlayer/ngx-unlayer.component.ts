import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgxUnlayerRestService } from './ngx-unlayer.service';
import { NgxUnlayerStore } from './ngx-unlayer.store';
import { Options } from './ngx-unlayer.model';
import { DomSanitizer } from '@angular/platform-browser';

import * as unlayer from './unlayer.embed.js';

declare var unlayer: any;

@Component({
	selector: 'ngx-unlayer',
	templateUrl: './ngx-unlayer.component.html',
	styleUrls: ['./ngx-unlayer.component.scss']
})

export class NgxUnlayerComponent implements OnInit {
	@Input() options: Options = null;
	@Input() mode: string = 'editor';
	@Output() onExportHTML = new EventEmitter();
	@Output() onDesignSave = new EventEmitter();
	@Output() onLoadTemplate = new EventEmitter();

	html: string = null;

	constructor(
		private cdRef: ChangeDetectorRef,
		private service: NgxUnlayerRestService,
		public store: NgxUnlayerStore,
		private sanitizer: DomSanitizer
	) {
	}

	ngOnInit() {
		const options: Options = Object.assign({}, this.options);

		unlayer.init({
			...options,
			id: 'editor',
			displayMode: 'email'
		});

		unlayer.addEventListener('design:updated', function (data) {
			this.html = null;
		});

		unlayer.addEventListener('design:loaded', (data) => {
			this.exportHTML();
		});

	}

	loadTemplateById(id) {
		unlayer.loadTemplate(id);
		this.onLoadTemplate.emit(id);
	}

	save() {
		unlayer.saveDesign((design) => {
			this.onDesignSave.emit(design);
		});
	}

	exportHTML() {
		unlayer.exportHtml((data) => {
			this.onExportHTML.emit(data.html);
			this.html = data.html;
			console.log(this.html);
			window.dispatchEvent(new Event('resize'));
			this.cdRef.detectChanges();
		});
	}

	sanitazeHtml(value) {
		return this.sanitizer.bypassSecurityTrustHtml(value);
	}

}
