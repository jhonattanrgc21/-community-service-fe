import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Tutor } from './interfaces/tutors.interface';
import { EditTutorComponent } from './pages/edit-tutor/edit-tutor.component';
import { TutorsService } from './services/tutors.service';

@Component({
	selector: 'app-tutors',
	templateUrl: './tutors.component.html',
	styleUrls: ['./tutors.component.scss'],
})
export class TutorsComponent implements OnInit {
	// Lista de tutores
	allTutors: Tutor[] = [];

	// Headers
	tutorHheaders: string[] = [
		'Cédula',
		'Nnombre',
		'Apellido',
		'Carrera',
	];

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _tutorsService: TutorsService,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.allTutors = this._activatedRoute.snapshot.data['tutors'];
	}

	goToNewTutor(): void {
		this._router.navigateByUrl('/layout/tutors/new-tutor');
	}

	onEditTutor(tutor: any): void {
		const dialogRef = this.dialog.open(EditTutorComponent, {
			width: '25%',
			data: tutor,
		});

		dialogRef.afterClosed().subscribe((isRefresh) => {
			if (isRefresh) {
				this._tutorsService.findAllTutors().subscribe((tutors: Tutor[]) => {
					this.allTutors = tutors;
				});
			}
		});
	}
}
