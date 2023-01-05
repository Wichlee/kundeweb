import {
    type ActivatedRouteSnapshot,
    type CanDeactivateFn,
    type RouterStateSnapshot,
    type UrlTree,
} from '@angular/router';
import { type CreateKundeComponent } from './create-kunde.component';
import { type Observable } from 'rxjs';
import log from 'loglevel';

// https://angular.io/api/router/CanDeactivate
// https://angular.io/guide/router#can-deactivate-guard

export const canDeactivateGuard: CanDeactivateFn<CreateKundeComponent> = (
    createKunde: CreateKundeComponent,
    _: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
    __: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
):
    | Observable<UrlTree | boolean>
    | Promise<UrlTree | boolean>
    | UrlTree
    | boolean => {
    if (createKunde.fertig) {
        // Seite darf zur gewuenschten URL verlassen werden
        return true;
    }

    createKunde.showWarning = true;
    createKunde.fertig = true;
    log.debug('CreateKundeComponent.canDeactivate: Verlassen der Seite');
    return false;
};
