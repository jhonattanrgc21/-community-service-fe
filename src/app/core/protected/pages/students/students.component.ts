import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from 'src/app/shared/constants/constants';
import {
	ApprovedStudent,
	AssignedStudent,
	Student,
} from './Interfaces/students.interface';
import { EditStudentComponent } from './pages/edit-student/edit-student.component';
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
	studentHeaders: string[] = [
		'Cédula',
		'Nombre',
		'Apellido',
		'Carrera',
		'Horas',
	];

	approvedStudentHeaders: string[] = [
		...this.studentHeaders,
		'Proyecto',
		'Fecha de aprobación',
	];

	assignedStudentHeaders: string[] = [
		'Cédula',
		'Nombre',
		'Apellido',
		'Carrera',
		'Proyecto',
		'Horas',
	];

	constructor(
		private _studenstServices: StudentsService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		public dialog: MatDialog,
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
		this._studenstServices
			.findActiveStudents()
			.subscribe((res: Student[]) => {
				this.activeStudents = res;
			});
	}

	onInactiveStudents(): void {
		// Obteniendo la lista de estudiantes inactivos
		this._studenstServices
			.findInactiveStudents()
			.subscribe((res: Student[]) => {
				this.inactiveStudents = res;
			});
	}

	onApprovedStudents(): void {
		// Obteniendo la lista de estudiantes aprobados
		this._studenstServices
			.findApprovedStudents()
			.subscribe((res: ApprovedStudent[]) => {
				this.approvedStudents = res;
			});
	}

	onAssignedStudents(): void {
		// Obteniendo la lista de estudiantes asignados a un proyecto
		this._studenstServices
			.findAssignedStudents()
			.subscribe((res: AssignedStudent[]) => {
				this.assignedStudents = res;
			});
	}

	onUnassignedStudents(): void {
		// Obteniendo la lista de estudiantes no asignados a un proyecto
		this._studenstServices
			.findUnassignedStudents()
			.subscribe((res: Student[]) => {
				this.unassignedStudents = res;
			});
	}

	goToNewStudent(): void {
		this._router.navigateByUrl(ROUTES.newStudents);
	}

	onEditStudent(student: any): void {
		const dialogRef = this.dialog.open(EditStudentComponent, {
			width: '25%',
			data: student,
		});

		dialogRef.afterClosed().subscribe((isRefresh) => {
			if (isRefresh) {
				// TODO: Hacer que se recargue la tabla de la vista actual
				this.handleTabChange();
			}
		});
	}
}
