import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { SharedModule } from '../common/shared.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { FormlyFormEnricher } from '../dynamic-form/formly-form-enricher';
import { ItemDetailsComponent } from './item-details.component';
import { ItemsListComponent } from './items-list.component';
import { CanDeactivateManagerGuard } from './manager.can-deactivate';
import { NewItemDialog } from './new-item.dialog';

export const managerRoutes: Routes = [
	{ path: 'manager/:itemsType', component: ItemsListComponent, pathMatch: 'full' },
	{ path: 'manager/:itemsType/:id', component: ItemDetailsComponent, pathMatch: 'full', canDeactivate: [CanDeactivateManagerGuard] },
	{ path: 'manager/:parentType/:parentId/:itemsType', component: ItemDetailsComponent, pathMatch: 'full' },
	{ path: 'manager/:parentType/:parentId/:itemsType/:id', component: ItemDetailsComponent, pathMatch: 'full', canDeactivate: [CanDeactivateManagerGuard] }
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyModule,
		CKEditorModule,
		AgmCoreModule,
		DynamicFormModule
	],
	exports: [],
	declarations: [
		ItemsListComponent,
		ItemDetailsComponent,
		NewItemDialog
	],
	entryComponents: [NewItemDialog],
	providers: [CanDeactivateManagerGuard]
})
export class ManagerModule {
}
