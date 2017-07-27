import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule
	],
	declarations: [HomeComponent],
})
export class HomeModule {
}
