import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { WikiSummary } from 'app/models/wiki.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  currentUserKey: string;

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private authService: AuthService
  ) { 
     this.authService.user.subscribe(x => {
      this.currentUserKey = x.authID
    })
  }

  summaryGet(searchTerm: string) : Observable<WikiSummary> {
    searchTerm = encodeURI(searchTerm);
    let baseUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
    return this.http.get<WikiSummary>(baseUrl+searchTerm);
  }

}
