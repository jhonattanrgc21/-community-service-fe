import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	form: FormGroup;

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			newPassword: [, [Validators.required]],
			confirmPassword: [, [Validators.required]],
		});
	}

	ngOnInit(): void {
	}

	isNotValid(field: string): boolean {
		return this.form.controls[field].invalid && this.form.controls[field].touched
	}

	onSave() {
		console.log('Contraseña guardada');
	}
}
