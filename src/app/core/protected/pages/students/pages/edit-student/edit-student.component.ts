import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../Interfaces/students.interface';

@Component({
	selector: 'app-edit-student',
	templateUrl: './edit-student.component.html',
	styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<EditStudentComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Student
	) {}

	ngOnInit(): void {}

	/**
	 * @description Permite cerrar el modal
	 */
	onClose(): void {
		this.dialogRef.close();
	}
}
