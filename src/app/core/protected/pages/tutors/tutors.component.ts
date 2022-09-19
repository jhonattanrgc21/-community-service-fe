import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutor } from './interfaces/tutors.interface';

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
		'Correo eectrónico',
		'Teléfono',
		'Carrera',
	];

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit(): void {
		this.allTutors = this._activatedRoute.snapshot.data['tutors'];
	}

	goToNewTutor(): void {
		this._router.navigateByUrl('/layout/tutors/new-tutor');
	}
}
