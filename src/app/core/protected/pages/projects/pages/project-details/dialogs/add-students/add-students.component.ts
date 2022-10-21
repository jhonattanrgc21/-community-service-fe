import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/core/protected/pages/students/Interfaces/students.interface';

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

	unassignedStudents: Student[] = [];

	constructor(
		public dialogRef: MatDialogRef<AddStudentsComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit(): void {
		this.unassignedStudents = this.data? this.data: [];
	}

	/**
	 * @description Permite cerrar el modal
	 */
	onClose(result?: string): void {
		this.dialogRef.close(result);
	}

	onAddStudents(studentsSelected: any[]): void{
		// TODO: aqui va la llamada al backend
	}
}
