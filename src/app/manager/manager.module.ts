import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { SharedModule } from '../common/shared.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { ItemDetailsComponent } from './item-details.component';
import { ItemsListComponent } from './items-list.component';
import { CanDeactivateManagerGuard } from './manager.can-deactivate';
import { NewItemDialog } from './new-item.dialog';
import { ItemsCollectionViewStore } from './items-collection-view.store';

import { NgxUnlayerModule } from '../common/ngx-unlayer/ngx-unlayer.module';
import { UnlayerDialog} from './unlayer.dialog';

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
		DynamicFormModule,
		NgxUnlayerModule
	],
	exports: [],
	declarations: [
		ItemsListComponent,
		ItemDetailsComponent,
		NewItemDialog,
		UnlayerDialog
	],
	entryComponents: [NewItemDialog, UnlayerDialog],
	providers: [CanDeactivateManagerGuard, ItemsCollectionViewStore]
})
export class ManagerModule {
}
