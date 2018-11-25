import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule, MatIconModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		RouterModule
	],
	declarations: [ToolbarComponent],
	exports: [
		ToolbarComponent
	]

})
export class ToolbarModule {
}
