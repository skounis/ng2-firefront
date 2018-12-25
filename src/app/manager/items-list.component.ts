import { orderBy } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/services/data.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialog } from '../common/dialogs/confirm.dialog';
import { NewItemDialog } from './new-item.dialog';
import { MenuService } from '../common/services/menu.service';
import { MenuItem } from '../common/models/menu-item';
import { ItemsCollectionViewStore } from './items-collection-view.store';

@Component({
	selector: 'items-list',
	styleUrls: ['./items-list.component.scss'],
	templateUrl: './items-list.component.html'
})
export class ItemsListComponent implements OnInit {
	items: any[];
	visibleItems: any[];

	currentMenuItem: MenuItem;

	itemsType: string;
	itemsTitle: string;
	displayedColumns: string[] = ['position', 'title', 'actionControls'];
	selectedViewMode: string = 'cards';

	constructor(
		private data: DataService,
		private dialog: MatDialog,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private menuService: MenuService,
		public viewStore: ItemsCollectionViewStore
	) {
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.initModule(params['itemsType']);
		});
		this.selectedViewMode = this.viewStore.viewMode ? this.viewStore.viewMode : 'cards';
	}

	editItem(item: any) {
		this.router.navigate(['./shell/manager', this.itemsType, item.$key]);
	}

	createItem() {
		let dialogRef = this.dialog.open(NewItemDialog, {
			width: '300px'
		});
		dialogRef.afterClosed().subscribe(itemName => {
			if (itemName) {
				let item = {
					title: itemName
				};
				this.data.createItem(this.itemsType, item);
			}
		});
	}

	canDelete(item: MenuItem): boolean {
		if (this.currentMenuItem && this.currentMenuItem.itemsType === 'system-menus') {
			return item.itemsType && !item.itemsType.startsWith('system-');
		}

		return true;
	}

	deleteItem($event: any, item: MenuItem) {
		$event.stopPropagation();

		let data = {
			title: 'Delete item',
			message: 'Do you want to delete the item?'
		};
		this.dialog.open(ConfirmDialog, { data: data })
			.afterClosed().subscribe(status => {
			if (status === 'OK') {
				this.data.deleteItem(this.itemsType, item);
			}
		});
	}

	private initModule(itemsType: string) {
		this.itemsType = itemsType;

		this.data
			.loadItems(itemsType)
			.subscribe(items => {
				this.menuService.menus.subscribe(menus => {
					const currentMenuItem = menus
						.find(x => x.itemsType === itemsType);

					this.itemsTitle = currentMenuItem
						? currentMenuItem.title
						: itemsType;

					if (currentMenuItem && currentMenuItem.itemsType === 'system-menus') {
						items = orderBy(items, ['order']);
					}

					this.currentMenuItem = currentMenuItem;
					this.items = items;
					this.visibleItems = items;
				});
			});
	}

	search(filter: string) {
		filter = filter.toLowerCase();

		this.visibleItems = this.items
			.filter(x => !filter || x.title.toLowerCase().indexOf(filter) >= 0);
	}

	onViewModeChange(mode: string) {
		this.selectedViewMode = mode;
		this.viewStore.viewMode = mode;
	}

	isModeSelected(mode: string): boolean {
		return mode === this.selectedViewMode;
	}
}
