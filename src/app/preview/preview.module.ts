import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { PreviewComponent } from './preview.component';
import { NgxUnlayerModule } from '../common/ngx-unlayer/ngx-unlayer.module';

@NgModule({
	declarations: [PreviewComponent],
	imports: [
		CommonModule,
		NgxUnlayerModule,
		MatIconModule,
		MatProgressSpinnerModule
	]
})
export class PreviewModule {
}
