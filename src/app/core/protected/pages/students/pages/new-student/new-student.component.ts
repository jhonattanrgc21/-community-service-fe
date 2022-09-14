import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewStudent } from '../../Interfaces/students.interface';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-new-student',
	templateUrl: './new-student.component.html',
	styleUrls: ['./new-student.component.scss'],
})
export class NewStudentComponent implements OnInit {
	/* Opciones del menu */
	selectedOption: number = 1;
	settings = [
		{ id: 1, title: 'Registrar un estudiante' },
		{ id: 2, title: 'Registrar varios estudiantes' },
	];

	// Variables para registrar un estudiantes
	generalForm: FormGroup = this._fb.group({
		first_name: ['', [Validators.required]],
		last_name: ['', [Validators.required]],
		nationality: ['', [Validators.required]],
		identification: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		phone: ['', [Validators.required]],
		career: ['', [Validators.required]],
	});

	careers = [
		{ id: 1, name: 'Computación' },
		{ id: 2, name: 'Física' },
		{ id: 3, name: 'Física' },
		{ id: 4, name: 'Matemática' },
		{ id: 5, name: 'Biología' },
	];
	nationalities: string[] = ['V', 'E', 'J', 'G'];
	newStudent!: NewStudent;

	// Variables para registrar varios estudiantes
	newStudents: NewStudent[] = [];
	headersNewStudent: string[] = [
		'Cédula',
		'Nombre',
		'Apellido',
		'Correo Electrónico',
		'Télefono',
		'Carrera'
	]

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {}

	/**
	 * @param option Opcion del menu para el tipo de registro del usuario
	 * @description Delecta los cambios en el menu de registro del estudiante
	 */
	changeOption(option: any) {
		this.selectedOption = option.id;
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
	 * @description Limpia el objeto del formulario y envia los datos al servidor
	 */
	onSaveStudent(): void {
		// Concatenando la nacionalidad con la cedula
		const document: string =
			this.generalForm.get('nationality')?.value +
			'-' +
			this.generalForm.get('identification')?.value;

		this.generalForm.get('identification')?.setValue(document);

		// Convirtiendo el formulario en un objeto
		this.newStudent = {
			first_name: this.generalForm.get('first_name')?.value,
			last_name: this.generalForm.get('last_name')?.value,
			identification: this.generalForm.get('identification')?.value,
			email: this.generalForm.get('email')?.value,
			phone: this.generalForm.get('phone')?.value,
			career: this.generalForm.get('career')?.value,
		};

		// Limpiando los espacios en blanco de cada campo del obtejo
		this.newStudent.first_name = this.newStudent.first_name.trim();
		this.newStudent.last_name = this.newStudent.last_name.trim();
		this.newStudent.identification = this.newStudent.identification.trim();
		this.newStudent.email = this.newStudent.email.trim();
		this.newStudent.phone = this.newStudent.phone.trim();

		// TODO: Registrar la llamada al servicio que envia los datos al servidor
	}

	onLoadExcel(event: any): void {
		const selectedFile = event.target.files[0];
		const fileReader = new FileReader();
		fileReader.readAsBinaryString(selectedFile);
		fileReader.onload = (event: any) => {
			let workBook = XLSX.read(fileReader.result, { type: 'binary' });
			const sheetNames = workBook.SheetNames;
			const excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
			excelData.forEach((data: any) => {
				let student: NewStudent = {
					identification: data.Cédula,
					first_name: data.Nombre,
					last_name: data.Apellido,
					email: data.Email,
					phone: data.Teléfono,
					career: data.Carrera
				}

				student.first_name = student.first_name.trim();
				student.last_name = student.last_name.trim();
				student.email = student.email.trim();
				student.career = student.career.trim();
				this.newStudents.push(student);
			})
		}
	}

	onSaveStudents(): void{
		// TODO: agregar la eticion para registrar todos losusuarios
		console.table(this.newStudents);
	}
}
