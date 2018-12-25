import { Component, ViewEncapsulation, HostListener, OnInit } from '@angular/core';
import { MenuItem } from '../common/models/menu-item';
import { orderBy } from 'lodash';
import { MenuService } from '../common/services/menu.service';
import { DynamicFormLoaderService } from '../dynamic-form/dynamic-form-loader.service';

@Component({
	selector: 'shell',
	templateUrl: 'shell.component.html',
	styleUrls: ['./shell.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ShellComponent implements OnInit {
	mode = 'side';
	opened = true;

	menus: MenuItem[];

	constructor(
		private menuService: MenuService,
		private formlyConfigLoader: DynamicFormLoaderService
	) {
	}

	ngOnInit(): void {
		this.menuService.menus.subscribe(menus => {
			menus = menus.filter(x => !x.itemsType.startsWith('system-'));

			this.menus = orderBy(menus, ['order']);
		});
		this.loadFormlyCofiguration();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.fitLayoutToWidth(event);
	}

	private async loadFormlyCofiguration() {
		this.formlyConfigLoader.init();
	}

	private fitLayoutToWidth(event) {
		if (event.target.innerWidth < (960 + 250)) {
			this.mode = 'over';
			this.opened = false;
		} else {
			this.mode = 'side';
			this.opened = true;
		}
	}
}
