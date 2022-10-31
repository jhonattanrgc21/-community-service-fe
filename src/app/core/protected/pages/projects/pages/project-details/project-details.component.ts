import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ChangeStatus } from 'src/app/core/protected/interfaces/users.interface';
import { Student } from '../../../students/Interfaces/students.interface';
import { StudentsService } from '../../../students/services/students.service';
import { TaskProject } from '../../../tasks/interfaces/tasks.iterface';
import { EditTaskComponent } from '../../../tasks/pages/edit-task/edit-task.component';
import { TasksService } from '../../../tasks/services/tasks.service';
import { ProjectDetails } from '../../interfaces/projects.interface';
import { ProjectService } from '../../services/projects.service';
import { AddStudentsComponent } from './dialogs/add-students/add-students.component';
import { NewTaskComponent } from '../../../tasks/pages/new-task/new-task.component';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { ROUTES } from 'src/app/shared/constants/constants';
import { GeneralService } from 'src/app/core/protected/services/general.service';
import { EditProjectComponent } from './dialogs/edit-project/edit-project.component';

@Component({
	selector: 'app-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
	@ViewChild(MatTabGroup) matTabGroup: any;

	myPerson!: Student;
	isSelect: boolean = false;
	projectId!: number;
	project!: ProjectDetails;

	// Filas de las tablas
	taskStudent: TaskProject[] = [];
	students: Student[] = [];
	studentsApproval: Student[] = [];

	// Headers de las tablas
	taskHeaders: string[] = [
		'Nombre',
		'Descripción',
		'CI del estudiante',
		'Nombre y apellido del estudiante',
		'Fecha de inicio',
		'Fecha de finalización',
		'Costo',
		'Estatus',
	];

	studentHeaders: string[] = [
		'Cédula',
		'Nombre',
		'Apellido',
		'Carrera',
		'Horas',
	];

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _projectService: ProjectService,
		private _tasksService: TasksService,
		private _studentsService: StudentsService,
		private _generalService: GeneralService,
		private _authService: AuthService,
		public dialog: MatDialog
	) {}

	get isStudent(): boolean {
		return this._authService.isStudent;
	}

	get isTutor(): boolean {
		return this._authService.isTutor;
	}

	get isCoordinator(): boolean {
		return this._authService.isCoordinator;
	}

	ngOnInit(): void {
		this.projectId = this._activatedRoute.snapshot.params['id'];

		// Obteniendo datos del proyecto
		this._projectService
			.findProjectById(this.projectId)
			.subscribe((res: ProjectDetails) => {
				this.project = res;
				if (this.project.status == 'Activo') {
					this.onTasksProject();
				}
			});

		this._generalService
			.findUserByIdentification(this._authService.identification)
			.subscribe((res) => {
				this.myPerson = res;
			});
	}

	handleTabChange() {
		switch (this.matTabGroup.selectedIndex) {
			case 0:
				this.onTasksProject();
				break;
			case 1:
				this.onStudentsProject();
				break;
			case 2:
				this.onStudentsAprobbal();
				break;
		}
	}

	/**
	 * @description Obtiene la lista de las tareas del proyecto asociado al ID
	 */
	onTasksProject(): void {
		this._tasksService
			.findAllTaskByProject(this.projectId)
			.subscribe((res: TaskProject[]) => {
				this.taskStudent = res;
			});
	}

	addNewTask() {
		const dialogRef = this.dialog.open(NewTaskComponent, {
			width: '25%',
			data: { projectId: this.projectId },
		});

		dialogRef.afterClosed().subscribe((isRefresh) => {
			if (isRefresh) {
				this.taskStudent = [];
				this.onTasksProject();
			}
		});
	}

	/**
	 * @description Obtiene la lista de estudiantes inscritos en el proyecto asociado al ID
	 */
	onStudentsProject(): void {
		this._projectService
			.findStudentsByProject(this.projectId)
			.subscribe((res: any[]) => {
				res.forEach((elem) => {
					let newStudent: Student = {
						id: elem.id,
						identification: elem.identification,
						first_name: elem.first_name,
						last_name: elem.last_name,
						career: elem.career,
						total_hours: elem.total_hours,
						email: elem.email,
						phone: elem.phone,
						status: elem.status,
					};
					this.students.push(newStudent);
				});
			});
	}

	/**
	 * @description Obtiene la lista de estudiantes para aprobar el servicio comuitario
	 */
	onStudentsAprobbal(): void {
		this._projectService
			.findStudentsAprobbalByProject(this.projectId)
			.subscribe((res: any[]) => {
				res.forEach((elem) => {
					let newStudent: Student = {
						id: elem.id,
						identification: elem.identification,
						first_name: elem.first_name,
						last_name: elem.last_name,
						career: elem.career,
						total_hours: elem.total_hours,
						email: elem.email,
						phone: elem.phone,
						status: elem.status,
					};
					this.studentsApproval.push(newStudent);
				});
			});
	}

	editTask(task: any): void {
		const dialogRef = this.dialog.open(EditTaskComponent, {
			width: '25%',
			data: task,
		});

		dialogRef.afterClosed().subscribe((isRefresh) => {
			if (isRefresh) {
				this.taskStudent = [];
				this.onTasksProject();
			}
		});
	}

	onEnrollProject(): void {
		let studentId: number[] = [];
		studentId.push(this.myPerson.id ? this.myPerson.id : 0);

		this._projectService
			.onAddStudents(this.projectId, studentId)
			.subscribe((ok) => {
				if (ok) {
					Swal.fire({
						title: 'Guardado',
						text: 'Su inscriptción fue procesada con exito!',
						icon: 'success',
					});
					this._authService.projectId = this.projectId;
					this._router.navigateByUrl(ROUTES.dashboard);
				} else {
					Swal.fire({
						title: 'Error',
						text: 'No se pudo realizar el proceso de inscriptción',
						icon: 'error',
					});
				}
			});
	}

	canInscription(): boolean {
		const role = this.isStudent;
		const isEnroll = this._authService.user.projectId ? false : true;
		return role && !isEnroll;
	}

	onEditProject(): void {
		const dialogRef = this.dialog.open(EditProjectComponent, {
			width: 'auto',
			height: 'auto',
			data: this.project,
		});

		dialogRef.afterClosed().subscribe((isRefresh) => {
			if (isRefresh == 'edit') {
				this._router.navigateByUrl(ROUTES.inactiveProject);
			}
		});
	}

	/**
	 * @description Guarda en la BD a los estudiantes aprobados
	 */
	onSaveStudentsAprobbal(studentsApproval: Student[]): void {
		let changeStatus: ChangeStatus = {
			identifications: this.studentsApproval.map((student) => student.id),
			status: 'Aprobado',
		};

		this._studentsService
			.updateStatusByIdentificationList(changeStatus)
			.subscribe((ok) => {
				if (ok) {
					Swal.fire({
						title: 'Guardado',
						text: 'Estudiante(es) aprobado(os) con exito!',
						icon: 'success',
					});
					this.studentsApproval = []
					this.onStudentsAprobbal();
				} else {
					Swal.fire({
						title: 'Error',
						text: 'No se pudo realizar la operación',
						icon: 'error',
					});
				}
			});
	}

	onAddStudents(): void {
		this._studentsService.findUnassignedStudents().subscribe((res) => {
			const unassignedStudents: Student[] = res;
			const dialogRef = this.dialog.open(AddStudentsComponent, {
				width: '50%',
				height: 'auto',
				data: { unassignedStudents, projectId: this.projectId },
			});

			dialogRef.afterClosed().subscribe((isRefresh) => {
				if (isRefresh == 'add') {
					this.students = [];
					this.onStudentsProject();
				}
			});
		});
	}

	onActiveSelect(): void {
		this.isSelect = !this.isSelect;
	}

	onExportStudents(studentsSelected: any[]): void {
		const ids = studentsSelected.map(student => student.id);
				this._projectService
					.exportTudentsByProject(ids)
					.subscribe((ok) => {
						if (ok) {
							Swal.fire({
								title: 'Guardado',
								text: 'Operación realizada con exito!',
								icon: 'success',
							});
							this.isSelect = false
							this.students = [];
							this.onStudentsProject();
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
