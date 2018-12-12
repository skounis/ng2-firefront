import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RealTimeDatabaseService } from './realtime-database.service';
import { CloudFireStoreService } from './cloud-firestore.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class DataService {
	private databaseService: string = 'rtdService';

	constructor(
		private rtdService: RealTimeDatabaseService,
		private cfsService: CloudFireStoreService,
	) {
		this.databaseService = environment.databaseType === 'cloud-firestore' ? 'cfsService' : 'rtdService';
	}

	loadItems(type: string): Observable<any[]> {
			return this[this.databaseService].loadItems(type);
	}

	loadItemsByParent(collection: string, parentId: string): Observable<any[]> {
		return this[this.databaseService].loadItemsByParent(collection, parentId);
	}

	createItem(itemType: string, item: any): Promise<void> {
		return this[this.databaseService].createItem(itemType, item);
	}

	deleteItem(itemType: string, item: any): Promise<void> {
		return this[this.databaseService].deleteItem(itemType, item);
	}

	loadItem(itemType: string, itemId: string): Observable<any> {
		return this[this.databaseService].loadItem(itemType, itemId);
	}

	saveItem(itemType: string, item: any): Promise<void> {
		return this[this.databaseService].saveItem(itemType, item);
	}

	patchEntity(item: any): any {
		return this[this.databaseService].patchEntity(item);
	}

}
