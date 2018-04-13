import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { PublicComponent } from './public.component';
import { ThanksComponent } from './thanks.component';

const routes: Routes = [
	{ path: 'public/thanks/:itemsType', component: ThanksComponent, pathMatch: 'full' },
	{ path: 'public/:itemsType', component: PublicComponent }
];

@NgModule({
	imports: [
		SharedModule,
		CommonModule,
		RouterModule.forChild(routes),
		DynamicFormModule
	],
	declarations: [PublicComponent, ThanksComponent],
	exports: [PublicComponent]
})
export class PublicModule {
}
