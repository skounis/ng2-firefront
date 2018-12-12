import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUnlayerComponent } from './ngx-unlayer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxUnlayerRestService } from './ngx-unlayer.service';
import { NgxUnlayerStore } from './ngx-unlayer.store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule
	],
	declarations: [
		NgxUnlayerComponent
	],
	exports: [
		NgxUnlayerComponent
	],
	providers: [
		NgxUnlayerStore,
		NgxUnlayerRestService
	]
})
export class NgxUnlayerModule {
}
