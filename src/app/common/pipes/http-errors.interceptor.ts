import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
	constructor(private snackbar: MatSnackBar) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req)
			.catch((response: any) => {
				if (response instanceof HttpErrorResponse) {
					console.log('There is an HTTP error: ', response);
					this.snackbar.open('An http error occurred', 'Ok', { duration: 3000 });
				}

				return Observable.throw(response);
			});
	}
}