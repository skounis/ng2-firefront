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
		let query = ref => ref.where('parentId', '==', parentId);
		return this.afCS.collection(collection, query)
			.snapshotChanges()
			.pipe(map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))));
	}

	loadItems(type: string): Observable<any[]> {
		return this.afCS.collection(type)
			.snapshotChanges()
			.pipe(map(actions => actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }))));
	}

	createItem(itemType: string, item: any): Promise<void> {
		let key = uuid();
		if (itemType === 'formConfig') {
			key = item.title;
			item[item.title] = [
				{
					type: 'input',
					key: 'title',
					templateOptions: {
						label: 'Title',
						required: true
					}
				}
			];
			delete item.title;
		}
		return this.afCS.collection(itemType).doc(key).set((item));
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
		return this.afCS.collection(itemType).doc(key)
			.ref.get()
			.then((documentSnapshot) => {
				let method = documentSnapshot.exists ? 'update' : 'set';
				if (itemType === 'formConfig' && !key) {
					return this.afCS.collection(itemType)[method](update);
				}
				return this.afCS.collection(itemType).doc(key)[method](update);
			})
			.catch((error) => {
			});

	}

	private patchEntity(item: any): any {
		let update = JSON.parse(JSON.stringify(item));
		delete update.$key;
		return update;
	}

}
