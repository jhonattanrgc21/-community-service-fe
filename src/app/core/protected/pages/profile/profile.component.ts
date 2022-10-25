import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { GeneralService } from '../../services/general.service';
import { ChangePassowrd } from './interfaces/profile.interface';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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
		current_password: ['', [Validators.required]],
		new_password: ['', [Validators.required]],
		confirm_new_password: ['', [Validators.required]],
	});

	constructor(
		private _fb: FormBuilder,
		private _generalService: GeneralService,
		private _authService: AuthService
	) {}

	ngOnInit(): void {
		// TODO: aqui va la integracion con el back
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
		this.changePassword = this.changePasswordForm.getRawValue();
	}
}
