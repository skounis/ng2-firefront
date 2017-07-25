import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { config } from '../../config';

@Component({
	templateUrl: 'forgot-password.component.html',
	styleUrls: ['forgot-password.component.scss']
})

export class ForgotPasswordComponent {
	email: string = '';
	error: string;
	message: string;

	appName = '';
	appSubtitle = '';
	appSlogan = '';

	constructor(private auth: AuthService, private router: Router) {
	}

	ngOnInit() {
		this.error = '';


		this.appName = config.app.name;
		this.appSubtitle = config.app.subtitle;
		this.appSlogan = config.app.slogan;
	}

	reset() {
		this.auth.resetPassword(this.email)
			.then(
				() => {
					this.error = '';
					this.message = 'Email has been sent';
				},
				(x) => {
					this.error = x.message;
					this.message = '';
				}
			);
	}
}
