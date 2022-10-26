import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
	Careers,
	emailPattern,
	Nationalities,
} from '../../constants/constants';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-dynamic-register',
	templateUrl: './dynamic-register.component.html',
	styleUrls: ['./dynamic-register.component.scss'],
})
export class DynamicRegisterComponent implements OnInit {
	@Input('name') name!: string;
	@Input('settings') settings!: any[];
	@Input('pathFormat') pathFormat!: string;
	@Input('downloadName') downloadName!: string;
	@Input('selectedOption') selectedOption!: any;
	@Input('isProject') isProject?: boolean = false;

	@Output() addNewUser = new EventEmitter<any>();
	@Output() addNewUsers = new EventEmitter<any[]>();
	@Output() addNewProject = new EventEmitter<any>();
	@Output() addNewProjects = new EventEmitter<any[]>();

	rows: any[] = [];
	headers: string[] = [];

	careers = Careers;
	nationalities: string[] = Nationalities;

	projectForm: FormGroup = this._fb.group({
		name: ['', [Validators.required]],
		description: [, [Validators.required]],
		date_start: ['', [Validators.required]],
		career: ['', [Validators.required]],
		coordinator_nationality: ['', [Validators.required]],
		coordinator_identification: ['', [Validators.required]],
		coordinator_first_name: ['', [Validators.required]],
		coordinator_last_name: ['', [Validators.required]],
		coordinator_career: ['', [Validators.required]],
	});

	generalForm: FormGroup = this._fb.group({
		first_name: ['', [Validators.required]],
		last_name: ['', [Validators.required]],
		nationality: ['', [Validators.required]],
		identification: ['', [Validators.required]],
		email: [
			'',
			[
				Validators.required,
				Validators.email,
				Validators.pattern(emailPattern),
			],
		],
		phone: [
			'',
			[
				Validators.required,
				Validators.minLength(11),
				Validators.maxLength(11),
			],
		],
		career: ['', [Validators.required]],
	});

	newUser: any = {};

	newProject: any = {};

	constructor(private _fb: FormBuilder, private _datePipe: DatePipe) {}

	ngOnInit(): void {}

	/**
	 * @param option Opcion del menu para el tipo de registro del usuario
	 * @description Delecta los cambios en el menu de registro del estudiante
	 */
	changeOption(option: any) {
		this.selectedOption = { ...option };
	}

	/**
	 * @description Verifica si el loginForm no es valido
	 * @param field
	 * @returns boolean
	 */
	isNotValid(form: FormGroup, field: string): boolean {
		return form.controls[field].invalid && form.controls[field].touched;
	}

	/**
	 * @description Obtiene los datos de una hoja de calculo en excel
	 * @param event archivo excel
	 */
	onLoadExcel(event: any): void {
		const selectedFile = event.target.files[0];
		const fileReader = new FileReader();
		fileReader.readAsBinaryString(selectedFile);
		fileReader.onload = (event: any) => {
			let workBook = XLSX.read(fileReader.result, { type: 'binary' });
			const sheetNames = workBook.SheetNames;
			const excelData = XLSX.utils.sheet_to_json(
				workBook.Sheets[sheetNames[0]]
			);
			if (this.isProject) {
				// TODO: corregir la lectura de la fecha de inicio en ms
				excelData.forEach((data: any) => {
					let project: any = {
						name: data['Nombre'],
						description: data['Descripción'],
						date_start: data['Fecha de inicio'],
						career: data['Carrera'],
						coordinator_identification: data['Cédula'],
						coordinator_first_name: data['Nombre del Coordinador'],
						coordinator_last_name: data['Apellido del Coordinador'],
						coordinator_career: data['Carrera del Coordinador'],
					};
					// Formateando la fecha local seleccionada
					project.date_start = this._datePipe.transform(
						project.date_start,
						'dd/MM/yyyy'
					);
					this.rows.push(project);
				});
				this.headers = [
					'Nombre',
					'Descripción',
					'Fecha de inicio',
					'Carrera',
					'C.I Coordinador',
					'Nombre del Coordinador',
					'Apellido del Coordinador',
					'Carrera del Coordinador'
				];
			} else {
				excelData.forEach((data: any) => {
					let user: any = {
						identification: data['Cédula'],
						first_name: data['Nombre'],
						last_name: data['Apellido'],
						email: data['Email'],
						phone: data['Teléfono'],
						career: data['.Carrera'],
					};

					user.first_name = user.first_name.trim();
					user.last_name = user.last_name.trim();
					user.email = user.email.trim();
					this.rows.push(user);
				});
				this.headers = [
					'Cédula',
					'Nombre',
					'Apellido',
					'Correo Electrónico',
					'Télefono',
					'Carrera',
				];
			}
		};
	}

	/**
	 * @description obtiene los datos del formulario del nuevo usuario y emite un objeto con los datos
	 */
	saveNewUser(): void {
		// Concatenando la nacionalidad con la cedula
		const document: string =
			this.generalForm.get('nationality')?.value +
			'-' +
			this.generalForm.get('identification')?.value;

		this.generalForm.get('identification')?.setValue(document);

		// Convirtiendo el formulario en un objeto
		this.newUser = {
			first_name: this.generalForm.get('first_name')?.value,
			last_name: this.generalForm.get('last_name')?.value,
			identification: this.generalForm.get('identification')?.value,
			email: this.generalForm.get('email')?.value,
			phone: this.generalForm.get('phone')?.value,
			career: this.generalForm.get('career')?.value,
		};

		// Limpiando los espacios en blanco de cada campo del objeto
		this.newUser.first_name = this.newUser.first_name.trim();
		this.newUser.last_name = this.newUser.last_name.trim();
		this.newUser.identification = this.newUser.identification.trim();
		this.newUser.email = this.newUser.email.trim();
		this.newUser.phone = this.newUser.phone.trim();

		this.generalForm.reset();
		this.addNewUser.emit(this.newUser);
	}

	/**
	 * @description emite un array de nuevos usuarios
	 */
	saveNewUsers(): void {
		this.addNewUsers.emit(this.rows);
	}

	/**
	 * @description obtiene los datos del formulario del nuevo proyecto y emite un objeto con los datos
	 */
	saveNewProject(): void {
		// Concatenando la nacionalidad con la cedula
		const document: string =
			this.projectForm.get('coordinator_nationality')?.value +
			'-' +
			this.projectForm.get('coordinator_identification')?.value;

		this.projectForm.get('coordinator_identification')?.setValue(document);

		this.newProject = {
			name: this.projectForm.get('name')?.value,
			description: this.projectForm.get('description')?.value,
			date_start: this.projectForm.get('date_start')?.value,
			career: this.projectForm.get('career')?.value,
			coordinator_identification: this.projectForm.get(
				'coordinator_identification'
			)?.value,
			coordinator_first_name: this.projectForm.get(
				'coordinator_first_name'
			)?.value,
			coordinator_last_name: this.projectForm.get('coordinator_last_name')
				?.value,
			coordinator_career:
				this.projectForm.get('coordinator_career')?.value,
		};

		// Formateando la fecha local seleccionada
		this.newProject.date_start = this._datePipe.transform(
			this.newProject.date_start,
			'dd/MM/yyyy'
		);

		// Limpiando los espacios en blanco de cada campo del objeto
		this.newProject.name = this.newProject.name.trim();
		this.newProject.description = this.newProject.description.trim();
		this.newProject.coordinator_first_name =
			this.newProject.coordinator_first_name.trim();
		this.newProject.coordinator_last_name =
			this.newProject.coordinator_last_name.trim();

		this.addNewProject.emit(this.newProject);
	}

	/**
	 * @description emite un array de nuevos proyectos
	 */
	saveNewProjects(): void {
		this.addNewProjects.emit(this.rows);
	}
}
