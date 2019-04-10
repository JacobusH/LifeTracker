import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from 'app/services';
import { User } from 'app/models';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUser: User;
  isLoggedIn: boolean = false;
  

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authService.afAuth.authState.subscribe(user => {
      this.isLoggedIn = (user) ? true : false;

      if(user != null ) {
        let currentUser$ = this.userService.getByAuthId(user.uid).valueChanges();
        currentUser$.subscribe(x => {
          if(x.length) {
            this.currentUser = x[0] as User;
          }
        });
      }
    })

  }

  logout() {
    this.authService.signOut();
  }

}
