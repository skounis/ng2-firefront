import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import { NgxUnlayerModule } from '../common/ngx-unlayer/ngx-unlayer.module';

@NgModule({
	declarations: [PreviewComponent],
	imports: [
		CommonModule,
		NgxUnlayerModule
	]
})
export class PreviewModule {
}
