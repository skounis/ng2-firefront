import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../common/models/menu-item';
import { MenuService } from '../common/services/menu.service';
import { orderBy } from 'lodash';

@Component({
	selector: 'home',
	styleUrls: ['./home.component.scss'],
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
	menus: MenuItem[];

	constructor(
		private menuService: MenuService
	) {
	}

	ngOnInit(): void {
		this.menuService.menus.subscribe(menus => {
			menus = menus.filter(x => !x.itemsType.startsWith('system-'));

			this.menus = orderBy(menus, ['order']);
		})
	}
}
