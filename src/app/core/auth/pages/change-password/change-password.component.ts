import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ROUTES } from 'src/app/shared/constants/constants';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
	token: string = '';
	form: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private _activatedRoute: ActivatedRoute,
		private authService: AuthService
	) {
		this.form = this.fb.group({
			password: [, [Validators.required, Validators.minLength(4)]],
			confirm_password: [, [Validators.required, Validators.minLength(4)]],
		});
	}

	ngOnInit(): void {
		this.token = this._activatedRoute.snapshot.params['token'];
	}

	isNotValid(field: string): boolean {
		return (
			this.form.controls[field].invalid &&
			this.form.controls[field].touched
		);
	}

	onSave() {
		const changePassword = this.form.value;
		this.authService
			.resetPassword(this.token, changePassword)
			.subscribe((ok) => {
				if (ok) {
					Swal.fire({
						title: 'Guardado',
						text: 'Su contraseña fue modificada con exito!',
						icon: 'success',
					});
					this.router.navigateByUrl(ROUTES.login);
				} else {
					Swal.fire({
						title: 'Error',
						text: 'No se pudo modificar la contraseña',
						icon: 'error',
					});
				}
			});
	}
}
