import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { uuid } from '../uuid';

@Injectable()
export class RealTimeDatabaseService {
	constructor(private afDB: AngularFireDatabase) {
	}

	getItemPath(type: string): string {
		if (type === 'system-menus') {
			return `system/menus`;
		}
		return type;
		// return `ft${type}`;
	}

	loadItems(type: string): Observable<any[]> {
		const itemPath = this.getItemPath(type);

		return this.afDB.list(itemPath)
			.snapshotChanges()
			.pipe(
				map(actions => actions.map(action => ({ $key: action.key, ...action.payload.val() })))
			);
	}

	loadItemsByParent(collection: string, parentId: string): Observable<any[]> {
		let query = ref => ref.orderByChild('parentId').equalTo(parentId);
		return this.afDB.list(collection, query)
			.snapshotChanges()
			.pipe(
				map(actions => actions.map(action => ({ $key: action.key, ...action.payload.val() })))
			);

	}

	createItem(itemType: string, item: any): Promise<void> {
		const itemPath = this.getItemPath(itemType);

		let key = uuid();
		return this.afDB.object(`${itemPath}/${key}`).set(item);
	}

	deleteItem(itemType: string, item: any): Promise<void> {
		const itemPath = this.getItemPath(itemType);

		let key = item.$key;
		return this.afDB.object(`${itemPath}/${key}`).remove();
	}

	loadItem(itemType: string, itemId: string): Observable<any> {
		const itemPath = this.getItemPath(itemType);
		return this.afDB.object(`${itemPath}/${itemId}`).valueChanges();
	}

	saveItem(itemType: string, item: any): Promise<void> {
		const itemPath = this.getItemPath(itemType);
		let key = item.$key;
		let update = this.patchEntity(item);
		if (itemPath === 'formConfig') {
			return this.afDB.object(`${itemPath}`).update(update);
		}

		return this.afDB.object(`${itemPath}/${key}`).update(update);
	}

	private patchEntity(item: any): any {
		let update = JSON.parse(JSON.stringify(item));
		delete update.$key;
		return update;
	}
}
