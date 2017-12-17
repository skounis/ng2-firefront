import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { ISubscription } from 'rxjs/Subscription';

@Component({
	selector: 'formly-field-prefix',
	template: `
		<prefix [formControl]="formControl" *ngIf="!to.hidden"
			(keydown)="onKeyDown()"></prefix>
	`
})
export class FormlyFieldPrefix extends FieldType {
	private wordsToSkip = ['a', 'of', 'an', 'the'];
	private controlSubscription: ISubscription;
	private formSubscription: ISubscription;
	private firstChange: boolean = true;
	private skipAutoDetection: boolean = false;

	ngOnInit() {
		super.ngOnInit();

		this.formSubscription = this.form.valueChanges.subscribe(formValue => {
			if (!formValue[this.key]) {
				this.skipAutoDetection = false;
				// console.log('Skip auto detection: false');
			}

			if (!this.firstChange) {
				return;
			}

			this.firstChange = false;
			if (formValue[this.key]) {
				this.skipAutoDetection = true;
				// console.log('Skip auto detection: true');
			}
		});

		this.controlSubscription = this.form.controls[this.to.baseField].valueChanges
			.subscribe((baseValue: string) => {
				if (this.skipAutoDetection || this.firstChange) {
					return;
				}

				// console.log('RUN auto detection');

				let prefix = this.getPrefix(baseValue);
				this.formControl.setValue(prefix, {});
			});
	}

	ngOnDestroy() {
		super.ngOnDestroy();
		this.controlSubscription.unsubscribe();
		this.formSubscription.unsubscribe();
	}

	onKeyDown() {
		this.skipAutoDetection = true;
		// console.log('Skip auto detection: true');
	}

	private getPrefix(name: string) {
		if (!name) {
			return '';
		}

		return name
			.toLowerCase()
			.split(' ')
			.map(x => x.trim())
			.filter(x => x.length > 0)
			.filter(x => this.wordsToSkip.indexOf(x) < 0)
			.map(x => x.substr(0, 1))
			.filter((char: string) => {
				const pattern = /[a-z]/i;
				return pattern.test(char[0]);
			})
			.join('');
	}
}
