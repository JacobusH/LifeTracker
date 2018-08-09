import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

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
        let currentUser$ = this.userService.getByAuthId(user.uid);
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
