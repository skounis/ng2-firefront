import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CKEditorModule } from 'ng2-ckeditor';
import { environment } from '../environments/environment';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { ROUTES } from './app.routes';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth.service';
import { CustomFormlyModule, ngFormlyConfig } from './common/formly/custom-formly.module';
import { HttpErrorsInterceptor } from './common/pipes/http-errors.interceptor';
import { DataService } from './common/services/data.service';
import { FireStorage } from './common/services/fire-storage';
import { SharedModule } from './common/shared.module';
import 'hammerjs';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ManagerModule } from './manager/manager.module';
import { PublicModule } from './public/public.module';
import { ShellModule } from './shell/shell.module';
import { AgmCoreModule } from '@agm/core';
import { S3Storage } from './common/services/s3-storage';

// Application wide providers
const APP_PROVIDERS = [
	...APP_RESOLVER_PROVIDERS,
	AuthService,
	FireStorage,
	S3Storage,
	DataService
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [ // import Angular's modules
		BrowserModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
		MatSnackBarModule,

		NgbModule.forRoot(),
		FormlyModule.forRoot(ngFormlyConfig),
		FormlyBootstrapModule,
		CustomFormlyModule,

		AgmCoreModule.forRoot({
			apiKey: environment.maps.apiKey
		}),
		FlexLayoutModule,
		CKEditorModule,

		AngularFireModule.initializeApp(environment.fire.auth),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		SharedModule,
		AuthModule,
		ShellModule,
		ManagerModule,
		PublicModule
	],
	providers: [ // expose our Services and Providers into Angular's dependency injection
		APP_PROVIDERS,
		{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true }
	]
})
export class AppModule {
	constructor(public appRef: ApplicationRef) {
	}
}
