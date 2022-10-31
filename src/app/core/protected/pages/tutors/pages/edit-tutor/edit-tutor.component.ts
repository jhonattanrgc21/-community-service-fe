import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { GeneralService } from 'src/app/core/protected/services/general.service';
import { Careers, emailPattern } from 'src/app/shared/constants/constants';

@Component({
	selector: 'app-edit-tutor',
	templateUrl: './edit-tutor.component.html',
	styleUrls: ['./edit-tutor.component.scss'],
})
export class EditTutorComponent implements OnInit {
	careers = Careers;

	profileForm: FormGroup = this._fb.group({
		first_name: ['', [Validators.required]],
		last_name: ['', [Validators.required]],
		identification: [
			{ disabled: true, value: null },
			[Validators.required],
		],
		email: [
			'',
			[
				Validators.required,
				Validators.email,
				Validators.pattern(emailPattern),
			],
		],
		phone: [
			'',
			[
				Validators.required,
				Validators.minLength(11),
				Validators.maxLength(15),
			],
		],
		career: ['', [Validators.required]],
	});

	constructor(
		private _fb: FormBuilder,
		private _generalService: GeneralService,
		public dialogRef: MatDialogRef<EditTutorComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit(): void {
		this.profileForm.controls['identification'].setValue(
			this.data?.identification
		);

		this.profileForm.controls['first_name'].setValue(this.data?.first_name);
		this.profileForm.controls['last_name'].setValue(this.data?.last_name);
		this.profileForm.controls['email'].setValue(this.data?.email);
		this.profileForm.controls['phone'].setValue(this.data?.phone);
		this.profileForm.controls['career'].setValue(this.data?.career);
	}

	/**
	 * @description Permite cerrar el modal
	 */
	onClose(result?: string): void {
		this.dialogRef.close(result);
	}

	/**
	 * @description Verifica si el formulario no es valido
	 * @param field
	 * @returns boolean
	 */
	isNotValid(form: FormGroup, field: string): boolean {
		return form.controls[field].invalid && form.controls[field].touched;
	}

	onSaveEditUser(): void {
		let tutor = this.profileForm.getRawValue();
		this._generalService
			.editUser(tutor)
			.subscribe((isEdited) => {
				if (isEdited) {
					Swal.fire({
						title: 'Guardado',
						text: 'Perfil del tutor actualizado con exito!',
						icon: 'success',
					});

					// Cerrando el modal
					this.onClose('edit');
				} else {
					Swal.fire({
						title: 'Error',
						text: 'No se pudo actualizar el perfil del tutor',
						icon: 'error',
					});
					// Cerrando el modal
					this.onClose();
				}
			});
	}
}
