import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { SharedModule } from '../common/shared.module';
import { FormlyFormEnricher } from './formly-form-enricher';
import { ItemDetailsComponent } from './item-details.component';
import { ItemsListComponent } from './items-list.component';
import { NewItemDialog } from './new-item.dialog';

export const managerRoutes: Routes = [
	{ path: 'manager/:itemsType', component: ItemsListComponent, pathMatch: 'full' },
	{ path: 'manager/:itemsType/:id', component: ItemDetailsComponent, pathMatch: 'full' },
	{ path: 'manager/:parentType/:parentId/:itemsType', component: ItemDetailsComponent, pathMatch: 'full' },
	{ path: 'manager/:parentType/:parentId/:itemsType/:id', component: ItemDetailsComponent, pathMatch: 'full' }
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyModule,
		CKEditorModule,
		AgmCoreModule
	],
	exports: [],
	declarations: [
		ItemsListComponent,
		ItemDetailsComponent,
		NewItemDialog
	],
	entryComponents: [NewItemDialog],
	providers: [FormlyFormEnricher]
})
export class ManagerModule {
}
