import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

	constructor(private router: Router, private authService: AuthService) { }

	get user() {
		return this.authService.user;
	}

	ngOnInit(): void {
	}
}
