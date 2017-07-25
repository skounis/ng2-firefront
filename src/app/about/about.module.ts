import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { AboutComponent } from './about.component';

@NgModule({
	imports: [
		MaterialModule
	],
	declarations: [AboutComponent]
})
export class AboutModule {
}
