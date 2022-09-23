import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter',
})
export class FilterPipe implements PipeTransform {
	transform(value: any, arg: any): any {
		if (arg === '' || arg.length < 3) return value;

		const result: any[] = [];
		for (const post of value) {
			if (post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
				result.push(post);
			}
		}
		return result;
	}
}
