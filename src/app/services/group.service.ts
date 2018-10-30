import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment} from '../../environments/environment';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';



const GROUP_DEMO_PATH = '/demo_emails';

const GROUP_PATH = '/emails';

@Injectable({
  providedIn: 'root'
})

export class GroupService {

  


  groupCollection: AngularFirestoreCollection<any>;
  groups: Observable<any[]>;

  constructor(private http: HttpClient, private afStorage: AngularFireStorage, private _fireStore: AngularFirestore) { }


  getGroups() {
    this.groupCollection = this._fireStore.collection(GROUP_PATH);
    return this.groups = this.groupCollection.snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          return Object.assign({ ref: a.payload.doc.id }, data);
        });
    }));
  }

  getDemoGroup(doc_id) {
    return this._fireStore.collection(GROUP_DEMO_PATH).doc(doc_id).valueChanges();
  }

  getGroup(doc_id) {
    

    return this._fireStore.collection(GROUP_PATH).doc(doc_id).valueChanges();
  }

  saveGroup(doc_id, doc) {
    if(doc_id)
      return this._fireStore.collection(GROUP_PATH).doc(doc_id).update(doc);
    else {
      const doc_id = this._fireStore.createId();
      doc.ref = doc_id;
      return this._fireStore.collection(GROUP_PATH).doc(doc_id)
      .set(Object.assign({ ref: doc_id }, doc));
    }
  }

  removeGroup(group: any) {
    return this._fireStore.collection(GROUP_PATH).doc(group.ref).delete()
  }

  public uploadFile(file: File) : Promise<any> {

    return new Promise((resolve, rejected) => {
      this.afStorage.upload('/upload/excel/file', file).then(data => {
        console.log(data);
  
        this.http.get(`${environment.api_url}/upload`).subscribe(data => {
          console.log(data);
          resolve(data);
        })
      });
    });  
  }

  public uploadFile2(ref, file: File) : Promise<any> {

    return new Promise((resolve, rejected) => {
      this.afStorage.upload('/upload/excel/file', file).then(data => {
        console.log(data);
  
        this.http.post(`${environment.api_url}/uploadfile`, {ref: ref}).subscribe(data => {
          console.log(data);
          resolve(data);
        })
      });
    });  
  }

  validateEmail(email) {
    return new Promise((resolve, rejected) => {
      this.http.get(`${environment.valid_api}&email=${email}&ip_address=198.2.228.20`).subscribe((data: any) => {
        resolve(data.status);
      });
    });
  }

  
  sendEmail(email, from, subject, content) {
    return new Promise((resolve, rejected) => {
      this.http.post(`${environment.api_url}/sendemail`, {
        email: email,
        from: from,
        subject: subject,
        content: content
      }).subscribe(data => {
        console.log('mail sent+++++++++++',data);
        resolve(data);
      })
    });
  }

  sendEmails(emailGroupId, from, subject, content) {
    return new Promise((resolve, rejected) => {
      this.http.post(`${environment.api_url}/sendemails`, {
        emailGroupId: emailGroupId,
        from: from,
        subject: subject,
        content: content
      }).subscribe(data => {
        console.log('mail sent+++++++++++',data);
        resolve(data);
      })
    });
  }
}
