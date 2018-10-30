import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

const HISTORY_PATH = '/histories';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {


  historyCollection: AngularFirestoreCollection<any>;
  histories: Observable<any[]>;

  constructor(private afStorage: AngularFireStorage, private _fireStore: AngularFirestore) { }

  getHistories() {
    this.historyCollection = this._fireStore.collection(HISTORY_PATH);
    return this.histories = this.historyCollection.snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          return Object.assign({ ref: a.payload.doc.id }, data);
        });
    }));
  }

  getHistory(record_Ref) {
    return this._fireStore.collection(HISTORY_PATH).doc(record_Ref).valueChanges();
  }

  removeHistory(record: any) {
    return this._fireStore.collection(HISTORY_PATH).doc(record.ref).delete()
  }
}
