import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

import { User } from '../models/user.model';

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
          return this.afs.doc<User>(`!Users/${user.uid}`).valueChanges()
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
    return this.oAuthLogin(provider);
  }
  
  signInWithFacebook() {
    const provider = new auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }


  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`!Users/${user.uid}`);

    const data: User = {
      authID: user.uid,
      key: user.uid,
      email: user.email,
      authDisplayName: user.displayName,
      name: user.displayName,
      authPhotoUrl: user.photoURL,
      authMethod: user.authMethod,
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