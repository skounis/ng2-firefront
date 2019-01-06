import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { SharedModule } from '../shared.module';
import { NgxUnlayerTemplatesComponent } from './ngx-unlayer-templates.component';
import { TemplateNameDialog } from './template-name.dialog';
import { NgxUnlayerComponent } from './ngx-unlayer.component';
import { NgxUnlayerRestService } from './ngx-unlayer.service';
import { NgxUnlayerStore } from './ngx-unlayer.store';
import { NgxUnlayerPreviewComponent } from './ngx-unlayer-preview.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		MatButtonModule,
		MatIconModule,
		MatProgressSpinnerModule,
		SharedModule
	],
	declarations: [
		NgxUnlayerComponent,
		NgxUnlayerTemplatesComponent,
		TemplateNameDialog,
		NgxUnlayerPreviewComponent
	],
	exports: [
		NgxUnlayerComponent,
		NgxUnlayerTemplatesComponent,
		NgxUnlayerPreviewComponent
	],
	providers: [
		NgxUnlayerStore,
		NgxUnlayerRestService
	],
	entryComponents: [TemplateNameDialog],

})
export class NgxUnlayerModule {
}