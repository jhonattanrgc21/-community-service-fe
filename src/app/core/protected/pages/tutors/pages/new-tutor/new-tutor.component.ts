import { Component, OnInit } from '@angular/core';
import { NewUser } from 'src/app/core/protected/interfaces/users.interface';
import { TutorsService } from '../../services/tutors.service';
import Swal from 'sweetalert2';
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

	constructor(private _tutorsService: TutorsService) {}

	ngOnInit(): void {}

	onSaveTutor(tutor: NewUser): void {
		this.newTutor = tutor;
		this._tutorsService.createTutor(this.newTutor).subscribe((ok) => {
			if (ok) {
				Swal.fire({
					title: 'Guardado',
					text: 'Tutor registrado con exito!',
					icon: 'success',
				});
			} else {
				Swal.fire({
					title: 'Error',
					text: 'El tutor no pudo ser registrado',
					icon: 'error',
				});
			}
		});
	}

	onSaveTutors(tutors: NewUser[]): void {
		this.newTutors = tutors;
		this._tutorsService.createTutors(this.newTutors).subscribe((ok) => {
			if (ok) {
				Swal.fire({
					title: 'Guardado',
					text: 'Tutores registrados con exito!',
					icon: 'success',
				});
			} else {
				Swal.fire({
					title: 'Error',
					text: 'No se pudo realizar el registro masivo de tutores',
					icon: 'error',
				});
			}
		});
	}
}
