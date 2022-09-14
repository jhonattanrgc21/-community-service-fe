import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePassowrd, GeneralProfile } from './interfaces/profile.interface';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	generalProfile!: GeneralProfile;
	changePassword!: ChangePassowrd;

	selectedOption: number = 1;
	settings = [
		{ id: 1, title: 'General' },
		{ id: 2, title: 'Cambio de contraseña' },
	];

	careers = [
		{ id: 1, name: 'Computación' },
		{ id: 2, name: 'Física' },
		{ id: 3, name: 'Física' },
		{ id: 4, name: 'Matemática' },
		{ id: 5, name: 'Biología' },
	];

	generalForm: FormGroup = this._fb.group({
		id: [],
		first_name: ['', [Validators.required]],
		last_name: ['', [Validators.required]],
		identification: ['', { disable: true }, [Validators.required]],
		phone: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		username: ['', { disable: true }, [Validators.required]],
		career: ['', [Validators.required]],
	});

	changePasswordForm: FormGroup = this._fb.group({
		current_password: ['', [Validators.required]],
		new_password: ['', [Validators.required]],
		confirm_new_password: ['', [Validators.required]],
	});

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		// TODO: aqui va la integracion con el back
		this.generalForm.get('identification')?.setValue('Test');
		this.generalForm.get('username')?.setValue('Test');
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
	}

	onSaveChangePassword(): void {
		this.changePassword = this.changePasswordForm.getRawValue();
	}
}
