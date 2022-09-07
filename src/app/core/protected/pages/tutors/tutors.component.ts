import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
		'Cedula',
		'Nnombre',
		'Apellido',
		'Correo eectrónico',
		'Teléfono',
		'Carrera',
	];

	constructor(
		private _activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.allTutors = this._activatedRoute.snapshot.data['tutors'];
	}
}
