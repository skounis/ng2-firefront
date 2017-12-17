import { NgModule } from '@angular/core';
import { SharedModule } from '../common/shared.module';
import { AboutComponent } from './about.component';

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [AboutComponent]
})
export class AboutModule {
}
