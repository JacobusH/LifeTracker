import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

import { User } from '../models/user.model';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`Users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  createEmailUser(credentials) {
    this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).catch(error => {
      console.log('Email register error', error);
    })
  }

  signInWithEmail(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
  }

  signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider, "Google");
  }
  
  signInWithFacebook() {
    const provider = new auth.FacebookAuthProvider()
    return this.oAuthLogin(provider, "Facebook");
  }

  private oAuthLogin(provider, place) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        console.log('creddy', credential)
        this.updateUserData(credential.user, place)
      })
  }


  private updateUserData(user, place) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Users/${user.uid}`);

    const data: User = {
      authID: user.uid,
      key: user.uid,
      email: user.email,
      authDisplayName: user.displayName,
      name: user.displayName,
      authPhotoUrl: user.photoURL,
      authMethod: place,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()

    }

    return userRef.set(data, { merge: true })

  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}