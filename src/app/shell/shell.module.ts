import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { AboutModule } from '../about/about.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SharedModule } from '../common/shared.module';
import { HomeComponent } from '../home/home.component';
import { HomeModule } from '../home/home.module';
import { managerRoutes } from '../manager/manager.module';
import { ReportsComponent } from '../reports/reports.component';
import { ReportsModule } from '../reports/reports.module';
import { ShellComponent } from './shell.component';
import { TopBarComponent } from './top-bar/top-bar.component';

const routes: Routes = [
	{
		path: 'shell',
		component: ShellComponent,
		canActivate: [AuthGuard],
		children: [
			...managerRoutes,
			{ path: '', component: HomeComponent, pathMatch: 'full' },
			{ path: 'reports', component: ReportsComponent, pathMatch: 'full' },
			{ path: 'about', component: AboutComponent, pathMatch: 'full' }
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
		ReportsModule,
		AboutModule,
		HomeModule
	],
	providers: []
})
export class ShellModule {
}
