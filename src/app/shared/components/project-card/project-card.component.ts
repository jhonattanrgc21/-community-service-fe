import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
	selector: 'app-project-card',
	templateUrl: './project-card.component.html',
	styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
	@Input('projects') projects!: any[];
	@Input('active') isActive?: boolean = false;

	filterProject: string = '';
	pageNumber: number = 1;
	pageSize: number = 6;
	pageSizeOptions: number[] = [6, 12, 18, 30, 60];

	constructor() {}

	ngOnInit(): void {}

	handlePage(event: PageEvent): void {
		this.pageNumber = event.pageIndex + 1;
		this.pageSize = event.pageSize;
	}

	applyFilter(event: Event) {
		setTimeout(() => {
			this.filterProject = (event.target as HTMLInputElement).value;
			this.filterProject = this.filterProject.toLowerCase();
		}, 1000);
	}
}
