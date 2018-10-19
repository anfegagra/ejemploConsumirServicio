import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        alert('Ocurrió un error inesperado.');
        console.log(error);  
    }    
}