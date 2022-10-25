import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from 'src/app/core/protected/services/general.service';
import {
	Careers,
	emailPattern,
	StatusUser,
} from 'src/app/shared/constants/constants';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-edit-student',
	templateUrl: './edit-student.component.html',
	styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
	careers = Careers;
	statuses = StatusUser;

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
				Validators.maxLength(11),
			],
		],
		career: ['', [Validators.required]],
		status: ['', [Validators.required]],
	});

	constructor(
		private _fb: FormBuilder,
		private _generalService: GeneralService,
		public dialogRef: MatDialogRef<EditStudentComponent>,
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
		this.profileForm.controls['status'].setValue(this.data?.status);
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
		let student = this.profileForm.getRawValue();
		this._generalService
			.editUser(student)
			.subscribe((isEdited) => {
				if (isEdited) {
					Swal.fire({
						title: 'Guardado',
						text: 'Perfil del estudiante actualizado con exito!',
						icon: 'success',
					});

					// Cerrando el modal
					this.onClose('edit');
				} else {
					Swal.fire({
						title: 'Error',
						text: 'No se pudo actualizar el perfil del estudiante',
						icon: 'error',
					});
					// Cerrando el modal
					this.onClose();
				}
			});
	}
}
