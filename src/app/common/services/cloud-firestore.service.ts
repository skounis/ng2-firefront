import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { uuid } from '../uuid';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CloudFireStoreService {

	constructor(private afCS: AngularFirestore) {
	}

	loadItemsByParent(collection: string, parentId: string): Observable<any[]> {
		let query = ref => ref.orderByChild('parentId').equalTo(parentId);
		return this.afCS.collection(collection, query).valueChanges();
	}

	loadItems(type: string): Observable<any[]> {
		return this.afCS.collection(type)
			.snapshotChanges()
			.pipe(map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))));
	}

	createItem(itemType: string, item: any): Promise<void> {
		let key = uuid();
		return this.afCS.collection(itemType).doc(key).set(item);
	}

	deleteItem(itemType: string, item: any): Promise<void> {
		let key = item.$key;
		return this.afCS.collection(itemType).doc(key).delete();
	}

	loadItem(itemType: string, itemId: string): Observable<any> {
		return this.afCS.collection(itemType).doc(itemId).valueChanges();
	}

	saveItem(itemType: string, item: any): Promise<void> {
		let key = item.$key;
		let update = this.patchEntity(item);
		return this.afCS.collection(itemType).doc(key).update(update);
	}

	private patchEntity(item: any): any {
		let update = JSON.parse(JSON.stringify(item));
		delete update.$key;
		return update;
	}

}