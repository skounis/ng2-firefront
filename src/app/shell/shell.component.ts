import { Component, ViewEncapsulation, HostListener, OnInit } from '@angular/core';
import { MenuItem } from '../common/models/menu-item';
import { orderBy } from 'lodash';
import { MenuService } from '../common/services/menu.service';

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
	) {
	}

	ngOnInit(): void {
		this.menuService.menus.subscribe( (menus: MenuItem[]) => {
			menus = menus.filter(x => !x.itemsType.startsWith('system-'));

			this.menus = orderBy(menus, ['order']);
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.fitLayoutToWidth(event);
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
