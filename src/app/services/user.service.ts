import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  colUSERS: string = '!Users';
  users: AngularFirestoreCollection<User>;
  
  constructor(private afs: AngularFirestore) { 
    this.users = this.afs.collection(this.colUSERS);
  }

  createNew(): User {
    let data: User = {
      authID: '',
      authMethod: '',
      authDisplayName: '' ,
      authPhotoUrl: '',
      key: '',
      name: '',
      email: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
      };
      return data;
  }

  saveNewUser(t: User): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.users.add(t);
    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  getByAuthId(authId: string): AngularFirestoreCollection<User> { 
    return this.afs.collection(this.colUSERS, ref => ref.where('authID', '==', authId));
  }

  getByUserKey(userKey: string): AngularFirestoreDocument<User> { 
    return this.afs.doc(this.colUSERS + '/' + userKey);
  }

  edit(item: User): Promise<void> {
    return this.users.doc(item.key).update(item);
  }

  delete(item: User): Promise<void> {
    return this.users.doc(item.key).delete();
  }

}
