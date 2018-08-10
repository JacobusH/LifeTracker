import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class CFService {
  public bhSub = new BehaviorSubject<boolean>(true);
  cfState$ = this.bhSub.asObservable();
  
  constructor() { }
  
  toggleState(){
    this.bhSub.next(!this.bhSub.value);
  }

  setStateTrue(){
    this.bhSub.next(true);
  }

  setStateFalse(){
    this.bhSub.next(false);
  }
}