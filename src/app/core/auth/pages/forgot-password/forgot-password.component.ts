import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { emailPattern, ROUTES } from 'src/app/shared/constants/constants';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
	form: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authService: AuthService
	) {
		this.form = this.fb.group({
			email: [
				,
				[
					Validators.required,
					Validators.email,
					Validators.pattern(emailPattern),
				],
			],
		});
	}

	ngOnInit(): void {}

	isNotValid(field: string): boolean {
		return (
			this.form.controls[field].invalid &&
			this.form.controls[field].touched
		);
	}

	onSend() {
		const email: string = this.form.controls['email'].value;
		this.authService.forgotPassword(email).subscribe((ok) => {
			if (ok) {
				Swal.fire({
					title: 'Email Enviado',
					text: 'En su correo encontrara un enlace para el restablecimiento de su contraseña!',
					icon: 'success',
				});
				this.router.navigateByUrl(ROUTES.login);
			} else {
				Swal.fire({
					title: 'Error',
					text: 'No se pudo enviar el email para restablecer su contraseña.',
					icon: 'error',
				});
			}
		});
	}
}
