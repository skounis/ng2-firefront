import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { config } from '../../config';


@Component({
	templateUrl: 'sign-up.component.html',
	styleUrls: ['sign-up.component.scss']
})

export class SignUpComponent {
	signupForm: FormGroup;
	error: string;

	appName = '';
	appSubtitle = '';
	appSlogan = '';

	constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
	}

	ngOnInit() {
		this.signupForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});

		this.error = '';

		this.appName = config.app.name;
		this.appSubtitle = config.app.subtitle;
		this.appSlogan = config.app.slogan;
	}

	signUp() {
		let data = this.signupForm.value;
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signUp(credentials).then(
			() => this.postSignUp(),
			error => this.error = error.message
		);
	}

	private postSignUp(): void {
		this.router.navigate(['/shell']);
	}
}
