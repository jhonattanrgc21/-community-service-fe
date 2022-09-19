import { Component, OnInit } from '@angular/core';
import { NewUser } from 'src/app/core/protected/interfaces/users.interface';

@Component({
	selector: 'app-new-tutor',
	templateUrl: './new-tutor.component.html',
	styleUrls: ['./new-tutor.component.scss'],
})
export class NewTutorComponent implements OnInit {
	settings = [
		{ id: 1, title: 'Registrar un tutor' },
		{ id: 2, title: 'Registrar varios tutores' },
	];
	selectedOption = this.settings[0];

	pathFormat: string =
		'../../../../../../../assets/docs/registro_usuarios.xlsx';

	downloadName: string = 'registro_tutores.xlsx';

	newTutor!: NewUser;
	newTutors: NewUser[] = [];

	constructor() {}

	ngOnInit(): void {}

	onSaveTutor(tutor: NewUser): void {
		this.newTutor = tutor;
		console.log(this.newTutor);

		// TODO: Agregar la peticion al backend para registrar el tutor
	}

	onSaveTutors(tutors: NewUser[]): void {
		this.newTutors = tutors;
		console.log(this.newTutors);

		// TODO: Agregar la peticion al backend para registrar los tutores
	}
}
