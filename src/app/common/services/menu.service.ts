import { Injectable } from "@angular/core";
import { MenuItem } from '../models/menu-item';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MenuService {
	menus: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
}