import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { 
  Tracker
} from './trackers.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { map, filter, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class TrackersNewService {
  currentUserKey: string;
  colAllTrackers = "allTrackers"

  constructor( 
    private afs: AngularFirestore,
    private userService: UserService,
    private authService: AuthService
  ) { 
     this.authService.user.subscribe(x => {
      this.currentUserKey = x.authID
    })
  }

  
  saveNewTracker(trackerEntry: Tracker)  {
    // We need to set the type from the constructor on our form obj here and our user key
    trackerEntry.userKey = this.currentUserKey;

    let test$ = this.checkTrackerIsNew(trackerEntry.name).valueChanges().subscribe(x => {
      console.log("checked", x)
    })
  }

  checkTrackerIsNew(trackerName: string) {
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers,
        ref => ref.where('trackerName', '==', trackerName)
        );
  }

  getAllTrackers(): AngularFirestoreCollection<string> { 
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers);
  }

}
