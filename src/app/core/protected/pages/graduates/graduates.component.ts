import { Component, OnInit } from '@angular/core';
import { ApprovedStudent } from '../students/Interfaces/students.interface';
import { GraduatesService } from './services/graduates.service';

@Component({
	selector: 'app-graduates',
	templateUrl: './graduates.component.html',
	styleUrls: ['./graduates.component.scss'],
})
export class GraduatesComponent implements OnInit {
	graduatedStudents: ApprovedStudent[] = [];
	headers: string[] = [
		'Cédula',
		'Nombre',
		'Apellido',
		'Carrera',
		'Horas',
		'Proyecto',
		'Fecha de aprobación',
	];
	constructor(private _graduatesService: GraduatesService) {}

	ngOnInit(): void {
		// Obteniendo la lista de estudiantes aprobados

		this._graduatesService
			.findGraduateStudents()
			.subscribe((res: ApprovedStudent[]) => {
				this.graduatedStudents = res;
				this.graduatedStudents.forEach((student) => {
					let date = student.date_approval.split('T')[0].split('-');
					student.date_approval =
						date[2] + '-' + date[1] + '-' + date[0];
				});
			});
	}
}
