import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Careers, emailPattern, Nationalities } from '../../constants/constants';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-dynamic-register',
	templateUrl: './dynamic-register.component.html',
	styleUrls: ['./dynamic-register.component.scss'],
})
export class DynamicRegisterComponent implements OnInit {
	@Input('name') name!: string;
	@Input('role') role!: string;
	@Input('settings') settings!: any[];
	@Input('pathFormat') pathFormat!: string;
	@Input('downloadName') downloadName!: string;
	@Input('selectedOption') selectedOption!: any;

	@Output() addNewUser = new EventEmitter<any>();
	@Output() addNewUsers = new EventEmitter<any[]>();

	rows: any[] = [];
	headers: string[] = [
		'Cédula',
		'Nombre',
		'Apellido',
		'Correo Electrónico',
		'Télefono',
		'Carrera',
	];

	careers = Careers;
	nationalities: string[] = Nationalities;

	generalForm: FormGroup = this._fb.group({
		first_name: ['', [Validators.required]],
		last_name: ['', [Validators.required]],
		nationality: ['', [Validators.required]],
		identification: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email, Validators.pattern(emailPattern)]],
		phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
		career: ['', [Validators.required]],
	});

	newUser: any = {};

	constructor(private _fb: FormBuilder) {}

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
			excelData.forEach((data: any) => {
				let user: any = {
					identification: data.Cédula,
					first_name: data.Nombre,
					last_name: data.Apellido,
					email: data.Email,
					phone: data.Teléfono,
					career: data.Carrera,
					role: this.role,
				};

				user.first_name = user.first_name.trim();
				user.last_name = user.last_name.trim();
				user.email = user.email.trim();
				user.career = user.career.trim();
				this.rows.push(user);
			});
		};
	}

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
			role: this.role,
		};

		// Limpiando los espacios en blanco de cada campo del obtejo
		this.newUser.first_name = this.newUser.first_name.trim();
		this.newUser.last_name = this.newUser.last_name.trim();
		this.newUser.identification = this.newUser.identification.trim();
		this.newUser.email = this.newUser.email.trim();
		this.newUser.phone = this.newUser.phone.trim();
		this.addNewUser.emit(this.newUser);
	}

	saveNewUsers(): void {
		this.addNewUsers.emit(this.rows);
	}
}
