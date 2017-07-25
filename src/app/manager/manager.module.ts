import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ItemsListComponent } from './items-list.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormlyModule } from 'ng-formly';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NewItemDialog } from './new-item.dialog';
import { ItemDetailsComponent } from './item-details.component';
import { AgmCoreModule } from '@agm/core';
import { FormlyFormEnricher } from './formly-form-enricher';

export const managerRoutes: Routes = [
	{ path: 'manager/:itemsType', component: ItemsListComponent },
	{ path: 'manager/:itemsType/:id', component: ItemDetailsComponent },
	{ path: 'manager/:parentType/:parentId/:itemsType', component: ItemDetailsComponent },
	{ path: 'manager/:parentType/:parentId/:itemsType/:id', component: ItemDetailsComponent }
];


@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
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
	providers: [FormlyFormEnricher],
})
export class ManagerModule {
}
