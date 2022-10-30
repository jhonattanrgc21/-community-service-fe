import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../../../../services/projects.service';
import { StatusProject } from 'src/app/shared/constants/constants';

@Component({
	selector: 'app-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
	statuses: string[] = StatusProject;

	projectForm: FormGroup = this._fb.group({
		status: ['', [Validators.required]],
	});

	constructor(
		private _projectService: ProjectService,
		private _fb: FormBuilder,
		public dialogRef: MatDialogRef<EditProjectComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit(): void {
		this.projectForm.controls['status'].setValue(this.data?.status);
	}

	/**
	 * @description Permite cerrar el modal
	 */
	onClose(message?: string): void {
		this.dialogRef.close(message);
	}

	onSaveProject(): void {
		const status = this.projectForm.get('status')?.value;
		this._projectService
			.editProject(this.data?.id, status)
			.subscribe((isEdited) => {
				if (isEdited) {
					Swal.fire({
						title: 'Guardado',
						text: 'Estatus del proyecto actualizado con exito!',
						icon: 'success',
					});

					// Cerrando el modal
					this.onClose('edit');
				} else {
					Swal.fire({
						title: 'Error',
						text: 'No se pudo actualizar el estatus del proyecto',
						icon: 'error',
					});
					// Cerrando el modal
					this.onClose();
				}
			});
	}
}
