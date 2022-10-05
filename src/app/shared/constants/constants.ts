export const Careers = [
	{ id: 1, name: 'Computación' },
	{ id: 2, name: 'Física' },
	{ id: 3, name: 'Química'},
	{ id: 4, name: 'Matemática' },
	{ id: 5, name: 'Biología' },
];

export const StatusUser: string[] = ['Activo', 'Inactivo', 'Aprobado']

export const Nationalities: string[] = ['V', 'E', 'J', 'G'];

export const TaskStatuses: string[] = ['Pendiente', 'En progreso', 'Completada', 'Comunidad'];

export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

export const ROUTES = {
	login: '/auth',
	dashboard: '/layout',
	profile: '/layout/profile',
	newStudents: '/layout/students/new-student',
	newProjects: '/layout/projects/new-project',
	activeProjectDetails: '/layout/projects/actives',
	inactiveProjectDetails: '/layout/projects/inactives',
};
