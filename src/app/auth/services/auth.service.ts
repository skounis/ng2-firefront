import { Injectable } from '@angular/core';
import { AuthProviders, AngularFire, FirebaseAuthState, AuthMethods } from 'angularfire2';
import { EmailPasswordCredentials } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
	roles: string[] = [];

	private authState: FirebaseAuthState = null;

	constructor(public fire: AngularFire) {
		fire.auth.subscribe((state: FirebaseAuthState) => {
			this.authState = state;
		});
	}

	auth(): Observable<boolean> {
		return this.fire.auth
			.take(1)
			.flatMap(auth => {
				if (!auth) {
					return Observable.of(false);
				}

				return this.fire.database.list('users/' + auth.uid)
					.do(roles => this.roles = roles.map(role => role.$value))
					.map(() => true);
			});
	}

	getName() {
		return this.authState.auth.displayName;
	}

	getEmail() {
		return this.authState.auth.email;
	}

	get authenticated(): boolean {
		return this.authState !== null;
	}

	get id(): string {
		return this.authenticated ? this.authState.uid : '';
	}

	resetPassword(email): firebase.Promise<any> {
		return firebase.auth().sendPasswordResetEmail(email);
	}

	signInWithEmail(credentials: EmailPasswordCredentials) {
		console.log('Sign in with email');
		let config = {
			provider: AuthProviders.Password,
			method: AuthMethods.Password,
		};
		return this.fire.auth.login(credentials, config);
	}

	signUp(credentials: EmailPasswordCredentials) {
		return this.fire.auth.createUser(credentials);
	}

	signIn(provider: number): firebase.Promise<FirebaseAuthState> {
		return this.fire.auth.login({ provider })
			.catch(error => console.log('ERROR @ AuthService#signIn() :', error));
	}

	signInWithGithub(): firebase.Promise<FirebaseAuthState> {
		return this.signIn(AuthProviders.Github);
	}

	signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
		return this.signIn(AuthProviders.Google);
	}

	signInWithTwitter(): firebase.Promise<FirebaseAuthState> {
		return this.signIn(AuthProviders.Twitter);
	}

	signOut(): Promise<void> {
		return this.fire.auth.logout();
	}
}