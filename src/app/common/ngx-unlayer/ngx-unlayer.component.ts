import { ChangeDetectorRef, Component, EventEmitter, Input, AfterViewInit, Output } from '@angular/core';
import { Options, Template, TEMPLATE_TYPE_SYSTEM, TEMPLATE_TYPE_USER } from './ngx-unlayer.model';
import { MatDialog } from '@angular/material';
import { TemplateNameDialog } from './template-name.dialog';
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

export class NgxUnlayerComponent implements AfterViewInit {
	@Input() options: Options = null;
	@Input() template: Template;
	@Output() onExportHTML = new EventEmitter();
	@Output() onDesignSave = new EventEmitter<any>();
	@Output() onLoadTemplate = new EventEmitter();
	@Output() onLoadDesign = new EventEmitter();

	constructor(
		private cdRef: ChangeDetectorRef,
		private service: NgxUnlayerRestService,
		public store: NgxUnlayerStore,
		private dialog: MatDialog,
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
		}, 0);

	}

	loadTemplateById(id) {
		unlayer.loadTemplate(id);
		this.onLoadTemplate.emit(id);
	}


	loadDesign(design) {
		unlayer.loadDesign(design);
	}

	save() {
		// Prompt for name
		if (this.template.type === TEMPLATE_TYPE_SYSTEM) {
			let dialogRef = this.dialog.open(TemplateNameDialog, {
				width: '300px'
			});
			dialogRef.afterClosed().subscribe(name => {
				this.template.name = name;
				this.template.type = TEMPLATE_TYPE_USER;
				this.saveDesign();
			});
		} else {
			this.saveDesign();
		}
	}

	/**
	 * Turn undefined values into null
	 * Firebase can't serialize `undefined`
	 */
	private safeNullFor(value) {
		return JSON.parse(JSON.stringify(value, function (k, v) {
			if (v === undefined) {
				return null;
			}
			return v;
		}));
	}

	private saveDesign() {
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
		});
	}

	// exportHTML() {
	// 	unlayer.exportHtml((data) => {
	// 		this.onExportHTML.emit(data.html);
	// 		this.html = data.html;
	// 		window.dispatchEvent(new Event('resize'));
	// 		this.cdRef.detectChanges();
	// 	});
	// }

}
