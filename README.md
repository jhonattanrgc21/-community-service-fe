# Servicio Comunitario

El propósito de este repositorio es la implementación del frontend para la app de gestión del  Servicio Comunitario de la Facultad Experimental de Ciencia y Tecnología (FACYT) en la Universidad de Carabobo (UC).

## Tecnologías utilizadas
- [Node.js](https://nodejs.org/es/)
- [TypeScript](https://www.typescriptlang.org/download)
- [Angular v14](https://angular.io/docs)
- [Bootstrap 5](https://angular.io/docshttps://getbootstrap.com/docs/5.0/getting-started/introduction/)

## Instalación
* Requisitos previos
    1. Instalar Node.js v16.16.0.
	2. Instalar Angular/cli
* Pasos para desplegar el proyecto de forma local
    1. Clonar el repositorio.
	2. Instalar las dependencias del `package.json`
	6. Correr la aplicación.
	7. Ir al navegador e ingresar a la ruta: http://localhost:4200/

## Comandos esenciales

### Instalación de Angular
```bash
npm i -g @angular/cli
```

### Instalación de dependencias del package.json
```bash
npm i
```

### Iniciar la app en modo de desarrollo
```bash
ng s -o
```

### Preparar y ejecutar la app para producción
```bash
ng build && ng e2e
```
