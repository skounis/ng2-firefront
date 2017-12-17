import { NgModule } from '@angular/core';
import { SharedModule } from '../common/shared.module';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [HomeComponent],
})
export class HomeModule {
}
