import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import {
	ApprovedStudent,
	AssignedStudent,
	Student,
} from './Interfaces/students.interface';
import { StudentsService } from './services/students.service';

@Component({
	selector: 'app-students',
	templateUrl: './students.component.html',
	styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
	@ViewChild(MatTabGroup) matTabGroup: any;

	// Lista de datos par las tablas
	activeStudents: Student[] = [];
	inactiveStudents: Student[] = [];
	approvedStudents: ApprovedStudent[] = [];
	assignedStudents: AssignedStudent[] = [];
	unassignedStudents: Student[] = [];

	// Lista de Headers
	activeStudentHeaders: string[] = [
		'Cedula',
		'Nombre',
		'Apellido',
		'Carrera',
		'Horas',
	];

	inactiveStudentHeaders: string[] = [
		'Cedula',
		'Nombre',
		'Apellido',
		'Carrera',
		'Horas',
	];

	approvedStudentHeaders: string[] = [
		'Cedula',
		'Nombre',
		'Apellido',
		'Carrera',
		'Horas',
		'Proyecto',
		'Fecha de aprobación',
	];

	assignedStudentHeaders: string[] = [
		'Cedula',
		'Nombre',
		'Apellido',
		'Carrera',
		'Proyecto',
		'Horas',
	];

	unassignedStudentHeaders: string[] = [
		'Cedula',
		'Nombre',
		'Apellido',
		'Carrera',
		'Horas',
	];

	constructor(
		private studenstServices: StudentsService,
		private _activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.activeStudents = this._activatedRoute.snapshot.data['students'];
	}

	handleTabChange() {
		switch (this.matTabGroup.selectedIndex) {
			case 0:
				this.onActiveStudents();
				break;
			case 1:
				this.onInactiveStudents();
				break;
			case 2:
				this.onApprovedStudents();
				break;
			case 3:
				this.onAssignedStudents();
				break;
			case 4:
				this.onUnassignedStudents();
				break;
		}
	}

	onActiveStudents(): void {
		// Obteniendo la lista de estudiantes activos
		this.studenstServices
			.getActiveStudents()
			.subscribe((res: Student[]) => {
				this.activeStudents = res;
			});
	}

	onInactiveStudents(): void {
		// Obteniendo la lista de estudiantes inactivos
		this.studenstServices
			.getInactiveStudents()
			.subscribe((res: Student[]) => {
				this.inactiveStudents = res;
			});
	}

	onApprovedStudents(): void {
		// Obteniendo la lista de estudiantes aprobados
		this.studenstServices
			.getApprovedStudents()
			.subscribe((res: ApprovedStudent[]) => {
				this.approvedStudents = res;
			});
	}

	onAssignedStudents(): void {
		// Obteniendo la lista de estudiantes asignados a un proyecto
		this.studenstServices
			.getAssignedStudents()
			.subscribe((res: AssignedStudent[]) => {
				this.assignedStudents = res;
			});
	}

	onUnassignedStudents(): void {
		// Obteniendo la lista de estudiantes no asignados a un proyecto
		this.studenstServices
			.getUnassignedStudents()
			.subscribe((res: Student[]) => {
				this.unassignedStudents = res;
			});
	}
}
