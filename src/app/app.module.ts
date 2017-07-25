import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { AngularFireModule } from 'angularfire2';
import { FormlyBootstrapModule, FormlyModule } from 'ng-formly';
import { CKEditorModule } from 'ng2-ckeditor';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { ROUTES } from './app.routes';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth.service';
import { CustomFormlyModule, ngFormlyConfig } from './common/formly/custom-formly.module';
import { DataService } from './common/services/data.service';
import { FireStorage } from './common/services/fire-storage';
import { SharedModule } from './common/shared.module';
import { config } from './config';
import 'hammerjs';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ManagerModule } from './manager/manager.module';
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
		HttpModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
		MdSnackBarModule,

		NgbModule.forRoot(),
		FormlyModule.forRoot(ngFormlyConfig),
		FormlyBootstrapModule,
		CustomFormlyModule,

		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyB3c6WmfOf9_Dd_Sh1gC2n7MjyGrUYPiSw'
		}),
		FlexLayoutModule,
		CKEditorModule,

		AngularFireModule.initializeApp(config.fire.auth, config.fire.authConfig),
		SharedModule,
		AuthModule,
		ShellModule,
		ManagerModule,

		AgGridModule.withComponents([])
	],
	providers: [ // expose our Services and Providers into Angular's dependency injection
		ENV_PROVIDERS,
		APP_PROVIDERS
	]
})
export class AppModule {
	constructor(public appRef: ApplicationRef) {
	}
}
