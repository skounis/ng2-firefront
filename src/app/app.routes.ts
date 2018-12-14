import { Routes } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';


export const ROUTES: Routes = [
	{ path: 'preview/:itemsType/:id', component: PreviewComponent},
	{ path: '**', redirectTo: 'shell' }
];
