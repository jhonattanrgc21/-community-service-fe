import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { Project } from '../../../projects/interfaces/projects.interface';
import { ProjectService } from '../../../projects/services/projects.service';
import { AssignedStudent } from '../../../students/Interfaces/students.interface';
import { StudentsService } from '../../../students/services/students.service';
import { Tutor } from '../../../tutors/interfaces/tutors.interface';
import { TutorsService } from '../../../tutors/services/tutors.service';
import { NewTask } from '../../interfaces/tasks.iterface';
import { TasksService } from '../../services/tasks.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-new-task',
	templateUrl: './new-task.component.html',
	styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
	taskForm: FormGroup = this._fb.group({
		name: ['', [Validators.required]],
		description: [, [Validators.required]],
		cost: ['', [Validators.required, Validators.min(0)]],
		student_identification: ['', [Validators.required]],
		tutor_identification: ['', [Validators.required]],
		project_id: ['', [Validators.required]],
	});

	students: AssignedStudent[] = [];
	tutors: Tutor[] = [];
	projects: Project[] = [];

	newTask!: NewTask;

	constructor(
		private _fb: FormBuilder,
		public dialogRef: MatDialogRef<NewTaskComponent>,
		private _studentsService: StudentsService,
		private _tutorsService: TutorsService,
		private _projectService: ProjectService,
		private _tasksService: TasksService
	) {}

	ngOnInit(): void {
		// Obteniendo la lista de los estudiantes que estan asignados a un proyecto
		this._studentsService
			.findAssignedStudents()
			.subscribe((res: AssignedStudent[]) => {
				this.students = res;
			});

		// Obteniendo la lista de todos los tutores
		this._tutorsService.findAllTutors().subscribe((res: Tutor[]) => {
			this.tutors = res;
		});

		// Obteniendo la lista de todos los proyectos activos
		this._projectService.findAllActiveProjects().subscribe((res: Project[]) => {
			this.projects = res;
		})
	}

	/**
	 * @description Permite cerrar el modal
	 */
	onClose(): void {
		this.dialogRef.close();
	}

	/**
	 * @description Guarda el registro de la nueva tarea
	 */
	onSaveNewTask(): void {
		this.newTask = this.taskForm.value;

		// Limpiando los espacios en blanco de los campos string
		this.newTask.name = this.newTask.name.trim();
		this.newTask.description = this.newTask.description.trim();

		this._tasksService.createTask(this.newTask).subscribe((isCreated: Boolean) => {
			if (isCreated) {
				Swal.fire({ title: 'Guardado', text: 'Tarea creada con exito!', icon: 'success' });
			}
			else {
				Swal.fire({
					title: 'Error',
					text: 'No se pudo crear la tarea',
					icon: 'error',
				});
			}
		});

		// Cerrando el modal
		this.onClose();
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
