import { Component, OnInit } from '@angular/core';
import { NewUser } from 'src/app/core/protected/interfaces/users.interface';

@Component({
	selector: 'app-new-student',
	templateUrl: './new-student.component.html',
	styleUrls: ['./new-student.component.scss'],
})
export class NewStudentComponent implements OnInit {
	/* Opciones del menu */
	settings = [
		{ id: 1, title: 'Registrar un estudiante' },
		{ id: 2, title: 'Registrar varios estudiantes' },
	];

	selectedOption = { ...this.settings[0] };

	pathFormat: string =
		'../../../../../../../assets/docs/registro_usuarios.xlsx';

	downloadName: string = 'registro_estudiantes.xlsx';

	newStudent!: NewUser;
	newStudents: NewUser[] = [];

	constructor() {}

	ngOnInit(): void {}

	/**
	 * @description Limpia el objeto del formulario y envia los datos al servidor
	 */
	onSaveStudent(student: NewUser): void {
		this.newStudent = student;
		console.log(this.newStudent);

		// TODO: Agregar la peticion al backend para registrar el estudiante
	}

	onSaveStudents(students: NewUser[]): void {
		this.newStudents = students;
		console.log(this.newStudents);

		// TODO: Agregar la peticion al backend para registrar a los estudiantes
	}
}
