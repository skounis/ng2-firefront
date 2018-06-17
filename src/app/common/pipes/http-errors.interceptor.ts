import { throwError as observableThrowError,  Observable } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
	constructor(private snackbar: MatSnackBar) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request)
			.pipe(
				tap(
					(event: HttpEvent<any>) => {
						if (event instanceof HttpResponse) {
							// do stuff with response if you want
						}
					}, (err: any) => {
						if (err instanceof HttpErrorResponse) {
							console.log('There is an HTTP error: ', err);
							this.snackbar.open('An http error occurred', 'Ok', { duration: 3000 });
						}
					}
				)
			);
	}
}