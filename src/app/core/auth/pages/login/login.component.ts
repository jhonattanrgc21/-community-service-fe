import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthLogin } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
		this.loginForm = this.fb.group({
			email: ['test@gmail.com', [Validators.required, Validators.email]],
			password: ['12345678', [Validators.required, Validators.minLength(8)]],
		});
	}

	ngOnInit(): void {
	}

	/**
	 * @description Verifica si el loginForm no es valido
	 * @param field
	 * @returns boolean
	 */
	isNotValid(field: string): boolean {
		return this.loginForm.controls[field].invalid && this.loginForm.controls[field].touched
	}

	/**
	 * @description Se encarga de generar el inicio de sesión
	 */
	onLogin() {
		this.router.navigateByUrl('/home')
		/*const authLogin: AuthLogin = this.loginForm.value;

		this.authService.login(authLogin).subscribe(ok => {
			if (ok === true) {
				this.router.navigateByUrl('/home')
			} else {
				// TODO: mostrar un modal con un error
				Swal.fire('Error', ok, 'error')
			}
		})*/
	}
}
