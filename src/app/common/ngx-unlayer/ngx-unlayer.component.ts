import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Options, Template, TEMPLATE_TYPE_SYSTEM, TEMPLATE_TYPE_USER } from './ngx-unlayer.model';
import { MatDialog } from '@angular/material';
import { TemplateNameDialog } from './template-name.dialog'
import { NgxUnlayerRestService } from './ngx-unlayer.service';
import { NgxUnlayerStore } from './ngx-unlayer.store';
import * as unlayer from './unlayer.embed.js';
import { Observable } from 'rxjs';

declare var unlayer: any;

@Component({
	selector: 'ngx-unlayer',
	templateUrl: './ngx-unlayer.component.html',
	styleUrls: ['./ngx-unlayer.component.scss']
})

export class NgxUnlayerComponent implements OnInit {
	@Input() options: Options = null;
	@Input() mode: string = 'editor';
	@Input() template: Template;
	@Output() onEditorDirty = new EventEmitter<boolean>();
	@Output() onExportHTML = new EventEmitter();
	@Output() onDesignSave = new EventEmitter<any>();
	@Output() onLoadTemplate = new EventEmitter();
	@Output() onLoadDesign = new EventEmitter();

	html: string = null;

	constructor(
		private cdRef: ChangeDetectorRef,
		private service: NgxUnlayerRestService,
		public store: NgxUnlayerStore,
		private dialog: MatDialog,
	) {
	}


	ngOnInit() {
		this.onEditorDirty.emit(false);
		const options: Options = Object.assign({}, this.options);

		console.log(options);
		if (this.template.design) {
			delete options.projectId;
			delete options.templateId;
		}
		unlayer.init({
			...options,
			id: 'editor',
			displayMode: 'email'
		});
		
		unlayer.addEventListener('design:updated', (data) => {
			console.log('unlayer, design:updated:', data)
			this.onEditorDirty.emit(true);
			this.html = null;
		});

		unlayer.addEventListener('design:loaded', (data) => {
			console.log('unlayer, design:loaded:', data)
			this.exportHTML();
		});

		if (this.template.design) {
			this.loadDesign();
		}
	}

	loadTemplateById(id) {
		unlayer.loadTemplate(id);
		this.onLoadTemplate.emit(id);
	}

	loadDesign() {
		unlayer.loadDesign(this.template.design);
	}

	save() {
		console.log(this.template);
		// Prompt for name
		if(this.template.type === TEMPLATE_TYPE_SYSTEM) {
			let dialogRef = this.dialog.open(TemplateNameDialog, {
				width: '300px'
			});
			dialogRef.afterClosed().subscribe(name => {
				this.template.name = name;
				this.template.type = TEMPLATE_TYPE_USER;
				this.saveDesign()
			});
		} else {
			this.saveDesign();
		}
	}

	/**
	 * Turn undefined values into null
	 * Firebase can't serialize `undefined`
	 */
	private safeNullFor(value){
		return JSON.parse(JSON.stringify(value, function (k, v) {
			if (v === undefined) {
				return null;
			}
			return v;
		}));
	}

	private saveDesign(){
		// const o = Observable.create(observer => {
		// 	unlayer.saveDesign((design) => {
		// 		this.template.design = this.safeNullFor(design);
		// 		observer.next(this.template);
		// 	});
		// })
		//
		// this.onDesignSave.emit(o);

		unlayer.saveDesign((design) => {
			this.template.design = this.safeNullFor(design);
			this.onDesignSave.emit(this.template);
			this.onEditorDirty.emit(false);
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

}
