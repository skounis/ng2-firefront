import { Routes } from '@angular/router';

export const ROUTES: Routes = [
	{ path: '**', redirectTo: 'shell/manager/businesses' }
];
