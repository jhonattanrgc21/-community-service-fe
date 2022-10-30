import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { GeneralService } from '../../services/general.service';
import { ChangePassowrd } from './interfaces/profile.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/shared/constants/constants';
import { StudentsService } from '../students/services/students.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	isValid: boolean = false;
	generalProfile!: any;
	changePassword!: ChangePassowrd;

	identification!: string;
	selectedOption: number = 1;
	settings = [
		{ id: 1, title: 'General' },
		{ id: 2, title: 'Cambio de contraseña' },
	];

	careers = [
		{ id: 1, name: 'Computación' },
		{ id: 2, name: 'Química' },
		{ id: 3, name: 'Física' },
		{ id: 4, name: 'Matemática' },
		{ id: 5, name: 'Biología' },
	];

	generalForm: FormGroup = this._fb.group({
		first_name: ['', [Validators.required]],
		last_name: ['', [Validators.required]],
		identification: [
			{ disabled: true, value: null },
			[Validators.required],
		],
		phone: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		career: ['', [Validators.required]],
	});

	changePasswordForm: FormGroup = this._fb.group({
		old_password: ['', [Validators.required]],
		password: ['', [Validators.required]],
		confirm_password: ['', [Validators.required]],
	});

	constructor(
		private _fb: FormBuilder,
		private _generalService: GeneralService,
		private _authService: AuthService,
		private _studentsService: StudentsService,
		private _router: Router
	) {}

	ngOnInit(): void {
		this.identification = this._authService.user.identification
			? this._authService.user.identification
			: '';
		this._generalService
			.findUserByIdentification(this.identification)
			.subscribe((user) => {
				this.generalForm
					.get('identification')
					?.setValue(user.identification);
				this.generalForm.get('first_name')?.setValue(user.first_name);
				this.generalForm.get('last_name')?.setValue(user.last_name);
				this.generalForm.get('email')?.setValue(user.email);
				this.generalForm.get('phone')?.setValue(user.phone);
				this.generalForm.get('career')?.setValue(user.career_name);
			});
	}

	get isProject(): boolean {
		return this._authService.user.projectId ? true : false;
	}

	/**
	 * @description Verifica si el loginForm no es valido
	 * @param field
	 * @returns boolean
	 */
	isNotValid(form: FormGroup, field: string): boolean {
		return form.controls[field].invalid && form.controls[field].touched;
	}

	changeOption(option: any) {
		this.selectedOption = option.id;
	}

	onSaveGeneral(): void {
		this.generalProfile = this.generalForm.getRawValue();

		// Limpiando los string
		this.generalProfile.first_name = this.generalProfile.first_name.trim();
		this.generalProfile.last_name = this.generalProfile.last_name.trim();
		this.generalProfile.phone = this.generalProfile.phone.trim();
		this.generalProfile.identification = this.identification;

		this._generalService.editUser(this.generalProfile).subscribe((ok) => {
			if (ok) {
				Swal.fire({
					title: 'Guardado',
					text: 'Perfil actualizado con exito!',
					icon: 'success',
				});
				this._router.navigateByUrl(ROUTES.dashboard);
			} else {
				Swal.fire({
					title: 'Error',
					text: 'No se pudo actualizar el perfil',
					icon: 'error',
				});
			}
		});
	}

	onSaveChangePassword(): void {
		const identification: string = this._authService.user.identification
			? this._authService.user.identification
			: '';

		this.changePassword = {
			old_password:
				this.changePasswordForm.controls['old_password'].value,
			password: this.changePasswordForm.controls['password'].value,
			confirm_password:
				this.changePasswordForm.controls['confirm_password'].value,
			identification,
		};

		this._authService
			.changePasswordProfile(this.changePassword)
			.subscribe((ok) => {
				if (ok) {
					Swal.fire({
						title: 'Guardado',
						text: 'Perfil actualizado con exito!',
						icon: 'success',
					});
					this._router.navigateByUrl(ROUTES.dashboard);
				} else {
					Swal.fire({
						title: 'Error',
						text: 'No se pudo actualizar el perfil',
						icon: 'error',
					});
				}
			});
	}

	onExitProject(): void {
		Swal.fire({
			title: '¿Desea salir del proyecto?',
			text: 'Esta acción no se podra deshacer',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, salir',
		}).then((result) => {
			if (result.isConfirmed) {
				this._studentsService
					.exitProject(this.identification)
					.subscribe((ok) => {
						if (ok) {
							Swal.fire({
								title: 'Guardado',
								text: 'Usted ha salido del proyecto con exito!',
								icon: 'success',
							});
							this._authService.projectId = null;
							this._router.navigateByUrl(ROUTES.dashboard);
						} else {
							Swal.fire({
								title: 'Error',
								text: 'No se pudo realizar la operación',
								icon: 'error',
							});
						}
					});
			}
		});
	}
}
