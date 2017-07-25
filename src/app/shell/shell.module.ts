import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ShellComponent } from './shell.component';
import { MaterialModule } from '@angular/material';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AboutComponent } from '../about/about.component';
import { ReportsComponent } from '../reports/reports.component';
import { ReportsModule } from '../reports/reports.module';
import { AboutModule } from '../about/about.module';
import { managerRoutes } from '../manager/manager.module';

const routes: Routes = [
	{
		path: 'shell',
		component: ShellComponent,
		canActivate: [AuthGuard],
		children: [
			...managerRoutes,
			{ path: 'reports', component: ReportsComponent },
			{ path: 'about', component: AboutComponent },
			{ path: 'detail', loadChildren: '../+detail#DetailModule' }
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
		MaterialModule,
		ReportsModule,
		AboutModule
	],
	providers: []
})
export class ShellModule {
}
