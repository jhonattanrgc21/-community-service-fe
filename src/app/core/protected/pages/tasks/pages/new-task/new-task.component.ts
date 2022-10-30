import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../../projects/interfaces/projects.interface';
import { ProjectService } from '../../../projects/services/projects.service';
import { AssignedStudent } from '../../../students/Interfaces/students.interface';
import { Tutor } from '../../../tutors/interfaces/tutors.interface';
import { TutorsService } from '../../../tutors/services/tutors.service';
import { NewTask } from '../../interfaces/tasks.iterface';
import { TasksService } from '../../services/tasks.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
	selector: 'app-new-task',
	templateUrl: './new-task.component.html',
	styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
	taskForm!: FormGroup;
	projectId!: number;
	hideProjectSelect: boolean = false;
	students: AssignedStudent[] = [];
	tutors: Tutor[] = [];
	projects: Project[] = [];
	newTask!: NewTask;

	constructor(
		private _fb: FormBuilder,
		public dialogRef: MatDialogRef<NewTaskComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private _authService: AuthService,
		private _tutorsService: TutorsService,
		private _projectService: ProjectService,
		private _tasksService: TasksService
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

	get identification(): string {
		return this._authService.user.identification
			? this._authService.user.identification
			: '';
	}

	ngOnInit(): void {
		this.taskForm = this._fb.group({
			name: ['', [Validators.required]],
			description: [, [Validators.required]],
			cost: ['', [Validators.required, Validators.min(0)]],
			student_identification: ['', [Validators.required]],
			tutor_identification: ['', [Validators.required]],
			project_id: ['', [Validators.required]],
		});
		this.projectId = this.data?.projectId ? this.data.projectId! : 0;

		if (this.isStudent) {
			this.taskForm.controls['student_identification'].setValue(
				this.identification
			);
			this.taskForm.controls['project_id'].setValue(
				this._authService.user.projectId
			);
			this.selectedProject();
		}

		if (this.isTutor) {
			this.taskForm.controls['tutor_identification'].setValue(
				this.identification
			);
		}

		if (this.projectId != 0) {
			this.taskForm.controls['project_id'].setValue(this.projectId);
			this.hideProjectSelect = true;
			this.selectedProject();
		}

		// Obteniendo la lista de todos los proyectos activos
		this._projectService
			.findAllActiveProjects()
			.subscribe((res: Project[]) => {
				this.projects = res;
			});

		// Obteniendo la lista de todos los tutores
		this._tutorsService.findAllTutors().subscribe((res: Tutor[]) => {
			this.tutors = res;
		});
	}

	selectedProject(): void {
		const project = this.taskForm.controls['project_id'].value;
		this._projectService.findStudentsByProject(project).subscribe((res) => {
			this.students = res;
		});
	}

	/**
	 * @description Permite cerrar el modal
	 */
	onClose(message?: string): void {
		this.dialogRef.close(message);
	}

	/**
	 * @description Guarda el registro de la nueva tarea
	 */
	onSaveNewTask(): void {
		// Limpiando los espacios en blanco de los campos string
		this.newTask = this.taskForm.value;
		this.newTask.name = this.newTask.name.trim();
		this.newTask.description = this.newTask.description.trim();

		this._tasksService
			.createTask(this.newTask)
			.subscribe((isCreated: Boolean) => {
				if (isCreated) {
					Swal.fire({
						title: 'Guardado',
						text: 'Tarea creada con exito!',
						icon: 'success',
					});
				} else {
					Swal.fire({
						title: 'Error',
						text: 'No se pudo crear la tarea',
						icon: 'error',
					});
				}
			});

		// Cerrando el modal
		this.onClose('created');
	}

	/**
	 * @description Verifica si el formulario no es valido
	 * @param field
	 * @returns boolean
	 */
	isNotValid(form: FormGroup, field: string): boolean {
		return form.controls[field].invalid && form.controls[field].touched;
	}
}
