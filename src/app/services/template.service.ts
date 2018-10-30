import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const TEMPLATES_PATH = '/templates';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  //templates: any[];

  templateCollection: AngularFirestoreCollection<any>;
  templates: Observable<any[]>;

  constructor(private _fireStore: AngularFirestore) { 
    // this.templates = [{
    //     name : 'New car campain',
    //     description: '',
    //     content: `<html><body></body></html>`
    // }]

    //this.templateCollection = this._fireStore.collection(TEMPLATES_PATH);
  }

  getTemplates() {
    this.templateCollection = this._fireStore.collection(TEMPLATES_PATH);
    return this.templates = this.templateCollection.snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          return Object.assign({ ref: a.payload.doc.id }, data);
        });
    }));
    
  }

  getTemplate(doc_id) {
    return this._fireStore.collection(TEMPLATES_PATH).doc(doc_id).valueChanges();
  }

  createTemplate(template: any) {
    const doc_id = this._fireStore.createId();
    template.ref = doc_id;

    return this._fireStore.collection(TEMPLATES_PATH).doc(doc_id).set(template);
  }

  saveTemplate(template: any) {
    return this._fireStore.collection(TEMPLATES_PATH).doc(template.ref).update(Object.assign({}, template));
  }

  removeTemplate(template: any) {
    return this._fireStore.collection(TEMPLATES_PATH).doc(template.ref).delete()
  }

}
