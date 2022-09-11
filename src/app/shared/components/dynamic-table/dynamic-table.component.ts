import {
	AfterViewInit,
	Component,
	OnInit,
	ViewChild,
	Input,
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
	@Input('filter') isFilter?: Boolean = false;

	// Paginador
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	// Variables para manipular datos de a tabla
	tableCols: any[] = [];
	dataSource = new MatTableDataSource<any>();

	constructor() {}

	ngOnInit(): void {
		// Eliminando campos innecesarios
		this.tableData = this.tableData.map(item => {
			delete item.project_id;
			return item
		})

		this.dataSource.data = this.tableData;
		this.tableCols =
			this.tableData && this.tableData.length > 0
				? Object.keys(this.tableData[0])
				: [];

		// Eliminando la columna ID
		this.tableCols.splice(0, 1);
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
