import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			email: [, [Validators.required]],
			password: [, [Validators.required]],
		});
	}

	ngOnInit(): void {
	}

	isNotValid(field: string): boolean {
		return this.loginForm.controls[field].invalid && this.loginForm.controls[field].touched
	}

	onLogin() {
		console.log(this.loginForm.value);
	}
}
