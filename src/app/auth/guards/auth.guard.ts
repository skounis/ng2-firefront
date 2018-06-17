import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(): Observable<boolean> {
		return this.authService
			.auth().pipe(
			map(authState => !!authState),
			tap(authenticated => {
				if (!authenticated) {
					this.router.navigate(['/sign-in']);
				}
			}),);
	}
}