import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { ForgotPasswordComponent } from './components/forgot-password.component';
import { SignInComponent } from './components/sign-in.component';
import { SignUpComponent } from './components/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
	{ path: 'sign-in', component: SignInComponent, canActivate: [UnauthGuard] },
	{ path: 'sign-up', component: SignUpComponent, canActivate: [UnauthGuard] },
	{ path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [UnauthGuard] }

];

@NgModule({
	declarations: [
		SignInComponent,
		SignUpComponent,
		ForgotPasswordComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		AuthGuard,
		AuthService,
		UnauthGuard
	]
})

export class AuthModule {
}

export { AuthGuard };
export { AuthService };
export { UnauthGuard };