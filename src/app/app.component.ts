/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DataService } from './common/services/data.service';
import { MenuService } from './common/services/menu.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	styleUrls: [
		'app.component.scss',
		'../../node_modules/primeng/resources/primeng.min.css',
		'../../node_modules/primeng/resources/themes/bootstrap/theme.css'
	],
	template: `
		<router-outlet></router-outlet>`,
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
	constructor(
		private dataService: DataService,
		private menuService: MenuService,
	) {
	}

	ngOnInit(): void {
		this.dataService
			.loadItems('system-menus')
			.subscribe(menus => {
				this.menuService.menus.next(menus);
			});
	}
}
