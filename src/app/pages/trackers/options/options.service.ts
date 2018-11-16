import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { 
  TrackerFieldTypeEnum, TrackerNode, ActivityInterval, Tracker
} from '../trackers.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { map, filter, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  currentUserKey: string;
  isDeletable$; 
  colAllTrackers = "allTrackers";
  colBase = 'tracker';

  constructor( 
    private afs: AngularFirestore,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { 
     this.authService.user.subscribe(x => {
      this.currentUserKey = x.authID
    })
  }

  getTrackerOptions(curTrackerName: string, userKey: string) {
    this.verifyUserKey(userKey);

    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers,
        ref => ref.where('name', '==', curTrackerName)
      );
  }

  saveTrackerOptions(trackerKey: string, options: any) {
    this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers)
      .doc(trackerKey)
      .update({options: options})

      // x.update({key: x.id});
  }
  
  verifyUserKey(userKey: string) {
    if(!this.currentUserKey) {
      this.currentUserKey = userKey
    }
  }

}
