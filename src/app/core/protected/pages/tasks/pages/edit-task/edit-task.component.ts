import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskStatuses } from 'src/app/shared/constants/constants';
import { Task, TutorTask } from '../../interfaces/tasks.iterface';
import { TasksService } from '../../services/tasks.service';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-edit-task',
	templateUrl: './edit-task.component.html',
	styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
	task?: Task;
	tasTutor?: TutorTask;
	isStudent: boolean = false;
	statuses: string[] = TaskStatuses;

	taskForm: FormGroup = this._fb.group({
		status: ['', [Validators.required]],
	});

	constructor(
		private _fb: FormBuilder,
		private _tasksService: TasksService,
		public dialogRef: MatDialogRef<EditTaskComponent>,
		@Inject(MAT_DIALOG_DATA) public data?: any
	) {}

	ngOnInit(): void {
		if (this.data?.tutor_indentification) {
			this.isStudent = true;
		}

		this.taskForm.controls['status'].setValue(this.data?.status);
	}

	/**
	 * @description Permite cerrar el modal
	 */
	onClose(message?: string): void {
		this.dialogRef.close(message);
	}

	onSaveTask(): void {
		const status = this.taskForm.get('status')?.value;
		this.data.status = status;

		this._tasksService
			.editTask(this.data?.id, status)
			.subscribe((isEdited) => {
				if (isEdited) {
					Swal.fire({
						title: 'Guardado',
						text: 'Estatus actualizado con exito!',
						icon: 'success',
					});

					// Cerrando el modal
					this.onClose('edit');
				} else {
					Swal.fire({
						title: 'Error',
						text: 'No se pudo actualizar el estatus de la tarea',
						icon: 'error',
					});
					// Cerrando el modal
					this.onClose();
				}
			});


	}
}
