import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { uuid } from '../uuid';
import { Http } from '@angular/http';

@Injectable()
export class DataService {
	constructor(private af: AngularFire, private http: Http) {
	}

	createConference(conference: any): firebase.Promise<void> {
		let key = uuid();
		return this.af.database.object(`conferences/${key}`)
			.set(conference)
			.then(() => key);
	}

	loadConferences(userId): FirebaseListObservable<any[]> {
		let opts;

		if (userId) {
			opts = {
				query: {
					orderByChild: 'author',
					equalTo: userId
				}
			};
		}
		return this.af.database.list('conferences', opts);
	}

	loadConference(id: string): Observable<any> {
		return this.af.database.object(`conferences/${id}`);
	}

	deleteConference(conference: any): firebase.Promise<void> {
		let key = conference.$key;
		return this.af.database.object(`conferences/${key}`).remove();
	}

	saveConference(conference: any): firebase.Promise<void> {
		return this.saveItem('conferences', conference);
	}

	validatePrefix(key: string, prefix: string, year: number): Observable<{ valid: boolean }> {
		return this.http.get(`https://us-central1-scigen-portal.cloudfunctions.net/validatePrefix?prefix=${prefix}&key=${key}&year=${year}`)
			.map(x => x.json());
	}

	loadItems(type: string): FirebaseListObservable<any[]> {
		return this.af.database.list(type);
	}

	loadItemsByParent(collection: string, parentId: string) {
		let opts = {
			query: {
				orderByChild: 'parentId',
				equalTo: parentId
			}
		};
		return this.af.database
			.list(collection, opts);
	}

	createItem(itemType: string, item: any) {
		let key = uuid();
		return this.af.database.object(`${itemType}/${key}`).set(item);
	}

	deleteItem(itemType: string, item: any): firebase.Promise<void> {
		let key = item.$key;
		return this.af.database.object(`${itemType}/${key}`).remove();
	}

	loadItem(itemType: string, itemId: string) {
		return this.af.database.object(`${itemType}/${itemId}`);
	}

	saveItem(itemType: string, item: any): firebase.Promise<void> {
		let key = item.$key;
		let update = this.patchEntity(item);
		return this.af.database.object(`${itemType}/${key}`).set(update);
	}

	private patchEntity(item: any) {
		let update = JSON.parse(JSON.stringify(item));
		delete update.$key;
		return update;
	}
}