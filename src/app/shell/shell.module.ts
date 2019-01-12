import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SharedModule } from '../common/shared.module';
import { HomeComponent } from '../home/home.component';
import { HomeModule } from '../home/home.module';
import { managerRoutes } from '../manager/manager.module';
import { ShellComponent } from './shell.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FormEditorComponent } from './form-editor/form-editor.component';
import { FormEditorModule } from './form-editor/form-editor.module';

const routes: Routes = [
	{
		path: 'shell',
		component: ShellComponent,
		canActivate: [AuthGuard],
		children: [
			...managerRoutes,
			{ path: 'form-config', component: FormEditorComponent },
			{ path: '', component: HomeComponent, pathMatch: 'full' },
		]
	}
];

@NgModule({
	declarations: [
		ShellComponent,
		TopBarComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		SharedModule,
		FormEditorModule,
		HomeModule
	],
	providers: []
})
export class ShellModule {
}
