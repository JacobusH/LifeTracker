import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services';

@Component({
  selector: 'app-rpg',
  templateUrl: './rpg.component.html',
  styleUrls: ['./rpg.component.scss']
})
export class RpgComponent implements OnInit {
	currentTrackerName = "";
  currentTrackerKey = "";
	userKey;

  constructor(
		private actRoute: ActivatedRoute,
		private router: Router,
    private authService: AuthService) { 

    }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
        this.authService.user.subscribe(user => {
            this.currentTrackerName = params['id'];
            this.userKey = user.authID;
        });
    });
	};

}
