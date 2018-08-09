import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
	loginError: string;

	constructor(
		private authService: AuthService,
		fb: FormBuilder,
		private router: Router
	) {
		this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }
  
  ngOnInit() {

  }

  emailLogin() {
    let data = this.loginForm.value;
		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.authService.signInWithEmail(credentials)
			.then(
				() => { /* nav to user page */ },
				error => this.loginError = error.message
			);
	}
	
	loginWithFacebook() {
		this.authService.signInWithFacebook().then(user => {
			this.router.navigate(['/trackers']);
		});
	}

	loginWithGoogle() {
		this.authService.signInWithGoogle().then(user => {
			this.router.navigate(['/trackers']);
		});
	}

}
