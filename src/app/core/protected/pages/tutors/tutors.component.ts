import { Component, OnInit } from '@angular/core';
import { Tutor } from './interfaces/tutors.interface';
@Component({
	selector: 'app-tutors',
	templateUrl: './tutors.component.html',
	styleUrls: ['./tutors.component.scss'],
})
export class TutorsComponent implements OnInit {
	// Lista de tutores
	allTutors: Tutor[] = [
		{
			identification: '123456',
			first_name: 'Usuario',
			last_name: 'Admin 1',
			email: 'test@gmail.com',
			phone: '0414-000001',
			career: 'Computación',
		},
		{
			identification: '123456',
			first_name: 'Usuario',
			last_name: 'Admin 2',
			email: 'test@gmail.com',
			phone: '0414-000001',
			career: 'Computación',
		},
		{
			identification: '123456',
			first_name: 'Usuario',
			last_name: 'Admin 3',
			email: 'test@gmail.com',
			phone: '0414-000001',
			career: 'Computación',
		},
	];

	// Headers
	tutorHheaders: string[] = [
		'Cedula',
		'Nnombre',
		'Apellido',
		'Correo eectrónico',
		'Teléfono',
		'Carrera',
	];

	constructor() {}

	ngOnInit(): void {}
}
