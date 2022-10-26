import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Student } from 'src/app/core/protected/pages/students/Interfaces/students.interface';
import { ProjectService } from '../../../../services/projects.service';

@Component({
	selector: 'app-add-students',
	templateUrl: './add-students.component.html',
	styleUrls: ['./add-students.component.scss'],
})
export class AddStudentsComponent implements OnInit {
	studentHeaders: string[] = [
		'Cédula',
		'Nombre',
		'Apellido',
		'Carrera',
		'Horas',
	];

	projectId!: number;
	unassignedStudents: Student[] = [];

	constructor(
		private _projectService: ProjectService,
		public dialogRef: MatDialogRef<AddStudentsComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit(): void {
		this.unassignedStudents = this.data.unassignedStudents
			? this.data.unassignedStudents
			: [];
		this.projectId = this.data.projectId ? this.data.projectId : 0;
	}

	/**
	 * @description Permite cerrar el modal
	 */
	onClose(result?: string): void {
		this.dialogRef.close(result);
	}

	onAddStudents(studentsSelected: any[]): void {
		const ids = studentsSelected.map(student => student.id);
		this._projectService
			.onAddStudents(this.projectId, ids)
			.subscribe((ok) => {
				if (ok) {
					Swal.fire({
						title: 'Guardado',
						text: 'Estudiante(es) agregado(os) con exito!',
						icon: 'success',
					});
					this.onClose('add');
				} else {
					Swal.fire({
						title: 'Error',
						text: 'No se pudo agregar al(los) estudiante(es)',
						icon: 'error',
					});
					this.onClose();
				}
			});
	}
}
