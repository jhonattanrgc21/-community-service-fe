import { SelectionModel } from '@angular/cdk/collections';
import {
	AfterViewInit,
	Component,
	OnInit,
	ViewChild,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-dynamic-table',
	templateUrl: './dynamic-table.component.html',
	styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
	// Valores de entrada
	@Input('headers') tableHeaders: string[] = [];
	@Input('data') tableData!: any[];
	@Input('filter') isFilter?: boolean = false;
	@Input('select') isSelect?: boolean = false;
	@Input('edit') isEdit?: boolean = false;

	@Output() confirmedSelection = new EventEmitter<any[]>();
	@Output() editRow = new EventEmitter<any>();

	// Paginador
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	// Variables para manipular datos de a tabla
	tableCols: any[] = [];
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	constructor() {}

	ngOnInit(): void {
		this.dataSource.data = this.tableData;
		this.tableCols =
			this.tableData && this.tableData.length > 0
				? Object.keys(this.tableData[0])
				: [];

		if (this.isSelect) {
			this.tableHeaders.unshift('select');
			this.tableCols.unshift('select');
		}

		if (this.isEdit) {
			this.tableHeaders.push(' ');
			this.tableCols.push('edit');
		}

		// Eliminando columnas innecesarios
		this.removeAatributes(this.tableCols, 'id');
		this.removeAatributes(this.tableCols, 'project_id');
		this.removeAatributes(this.tableCols, 'role');
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	removeAatributes(array: any, value: string): void {
		const posId = array.indexOf(value);
		if (posId != -1) {
			array.splice(posId, 1);
		}
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	toggleAllRows() {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}

		this.selection.select(...this.dataSource.data);
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: any): string {
		if (!row) {
			return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
			row.position + 1
		}`;
	}

	viewConfirmButton(): boolean {
		return this.selection.selected.length > 0;
	}

	onConfirmSelection(): void {
		this.confirmedSelection.emit(this.selection.selected);
	}

	onEdit(row: any): void {
		this.editRow.emit(row);
	}
}
