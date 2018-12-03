import { Component, OnChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ToolbarOptions } from './toolbar-option.interface';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../common/services/menu.service';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';

@Component({
	selector: 'toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarComponent implements OnChanges {
	@Input() options: ToolbarOptions = {};
	@Input() title: string = '';

	breadcrumbs = [];

	private defaultOptions: ToolbarOptions = {
		multiRows: false,
		allowBreadCrumbs: false,
		backButton: false
	};

	_options: ToolbarOptions;

	constructor(
		private route: ActivatedRoute,
		private menuService: MenuService,
		private dataService: DataService,
		private changeDetectorRef: ChangeDetectorRef,
		private location: Location,
	) {
	}

	ngOnChanges(changes) {
		if (changes.options) {
			this._options = { ...this.defaultOptions, ...this.options };

		}
		this.loadBreadCrumbs();
	}

	loadBreadCrumbs() {
		const { itemsType, parentId, parentType } = this.route.snapshot.params;

		this.breadcrumbs = [];
		// TODO: how we can get menu information in other way
		this.menuService.menus.subscribe((menuItems) => {

			if (parentType) {
				const parentMenuItem = menuItems
					.find(x => x.itemsType === parentType);
				this.breadcrumbs.push({ title: parentMenuItem.title, url: `/shell/manager/${parentType}/` });

				if (!parentMenuItem) {
					return;
				}

				if (parentId) {
					// TODO: how we can get information without additional call to firebase;
					this.dataService.loadItem(parentType, parentId)
						.subscribe(item => {
							this.breadcrumbs.push({ title: item.title, url: `/shell/manager/${parentType}/${parentId}` });
							this.changeDetectorRef.detectChanges();
						});
				}
			} else {
				const currentItem = menuItems
					.find(x => x.itemsType === itemsType);

				if (!currentItem) {
					return;
				}

				this.breadcrumbs.push({ title: currentItem.title, url: `/shell/manager/${itemsType}/` });
			}

		});


	}


	back() {
		this.location.back();
	}

}
