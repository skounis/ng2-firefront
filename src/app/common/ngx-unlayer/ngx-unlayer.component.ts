import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Options } from './ngx-unlayer.model';
import { NgxUnlayerRestService } from './ngx-unlayer.service';
import { NgxUnlayerStore } from './ngx-unlayer.store';
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
	@Input() design;
	@Output() onExportHTML = new EventEmitter();
	@Output() onDesignSave = new EventEmitter<any>();
	@Output() onLoadTemplate = new EventEmitter();
	@Output() onLoadDesign = new EventEmitter();

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

		console.log(options);
		if (this.design) {
			delete options.projectId;
			delete options.templateId;
		}
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

		if (this.design) {
			this.loadDesign();
		}
	}

	loadTemplateById(id) {
		unlayer.loadTemplate(id);
		this.onLoadTemplate.emit(id);
	}

	loadDesign() {
		unlayer.loadDesign(this.design);
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
			window.dispatchEvent(new Event('resize'));
			this.cdRef.detectChanges();
		});
	}

	sanitazeHtml(value) {
		return this.sanitizer.bypassSecurityTrustHtml(value);
	}

}
