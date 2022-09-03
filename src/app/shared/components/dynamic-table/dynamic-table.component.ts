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
		this.dataSource.data = this.tableData;
		this.tableCols =
			this.tableData && this.tableData.length > 0
				? Object.keys(this.tableData[0])
				: [];
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
