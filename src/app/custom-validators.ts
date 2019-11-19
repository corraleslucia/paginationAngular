import { ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { UserService } from './services/user.service';

export class CustomValidator {

    static validEmail(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const forbidden = new RegExp("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(gmail|outlook)\.com$").test(control.value);
            return forbidden ? null : { "invalidEmail": { value: control.value } };
        }
    }

    static emailNotUsed(userService: UserService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const email = control.value.toLowerCase();
            return userService.checkEmail(email).pipe(
                map(() => {
                    return null;
                }),
                catchError(() => of({ 'emailUsed': { value: true } }))
            );
        }
    }

    static emailExists(userService: UserService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const email = control.value.toLowerCase();
            return userService.checkEmail(email).pipe(
                map(() => {
                    return { 'emailNotExists': { value: true } };
                }),
                catchError(() => of(null))
            );
        }
    }
}