import { Component, OnInit } from '@angular/core';
import { NewUser } from 'src/app/core/protected/interfaces/users.interface';
import { StudentsService } from '../../services/students.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/shared/constants/constants';

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

	constructor(
		private _studentsService: StudentsService,
		private router: Router
	) {}

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
				this.router.navigateByUrl(ROUTES.students);
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
		this._studentsService
			.createStudents(this.newStudents)
			.subscribe((res) => {
				if (Object.keys(res).length == 2) {
					let message: string = '';
					const total = res.successful.length + res.failed.length;
					const sizeSuccess = res.successful.length;
					const sizeFailed = res.failed.length;

					if (sizeFailed == 0) {
						Swal.fire({
							title: 'Guardado',
							text: 'La operación fue realizada con exito!',
							icon: 'success',
						});
					} else {
						if (sizeSuccess > 0 && sizeFailed > 0) {
							Swal.fire({
								text: `Se registraron ${total} estudiante(es) de ${sizeSuccess}`,
								icon: 'info',
							});
						} else {
							Swal.fire({
								text: 'Los estudiante(s) ya se encuentran registrado(s)',
								icon: 'info',
							});
						}
					}
					this.router.navigateByUrl(ROUTES.students);
				} else {
					Swal.fire({
						title: 'Error',
						text: 'No se pudo realizar la operación',
						icon: 'error',
					});
				}
			});
	}
}
