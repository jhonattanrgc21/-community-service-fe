import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	form: FormGroup;

	constructor(private fb: FormBuilder, private router: Router) {
		this.form = this.fb.group({
			email: [, [Validators.required, Validators.email]],
		});
	}

	ngOnInit(): void {
	}

	isNotValid(field: string): boolean {
		return this.form.controls[field].invalid && this.form.controls[field].touched
	}

	onSend() {
		console.log('Se envio el email');
	}
}
