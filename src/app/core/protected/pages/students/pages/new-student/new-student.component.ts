import { Component, OnInit } from '@angular/core';
import { NewUser } from 'src/app/core/protected/interfaces/users.interface';
import { StudentsService } from '../../services/students.service';
import Swal from 'sweetalert2';

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

	constructor(private _studentsService: StudentsService) {}

	ngOnInit(): void {}

	/**
	 * @description Limpia el objeto del formulario y envia los datos al servidor
	 */
	onSaveStudent(student: NewUser): void {
		this.newStudent = student;
		this._studentsService.createStudent(this.newStudent).subscribe((ok) => {
			if (ok) {
				Swal.fire({
					title: 'Guardado',
					text: 'Estudiante registrado con exito!',
					icon: 'success',
				});
			} else {
				Swal.fire({
					title: 'Error',
					text: 'El estudiante no pudo ser registrado',
					icon: 'error',
				});
			}
		});
	}

	onSaveStudents(students: NewUser[]): void {
		this.newStudents = students;
		this._studentsService.createStudents(this.newStudents).subscribe((ok) => {
			if (ok) {
				Swal.fire({
					title: 'Guardado',
					text: 'Estudiantes registrados con exito!',
					icon: 'success',
				});
			} else {
				Swal.fire({
					title: 'Error',
					text: 'No se pudo realizar el registro masivo de estudiantes',
					icon: 'error',
				});
			}
		});
	}
}
