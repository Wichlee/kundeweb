import {
    deleteAuthorization,
    getAuthorization,
    getRoles,
} from './storage.service';
import { first, tap } from 'rxjs/operators';
import { BasicAuthService } from './basic-auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import log from 'loglevel';

export const ROLLE_ADMIN = 'admin';
// Spring Security:
// export const ROLLE_ADMIN = 'ROLE_ADMIN'

@Injectable({ providedIn: 'root' })
export class AuthService {
    // in RxJS: Observables = Event-Streaming mit Promises
    // Subject statt Basisklasse Observable: in login() und logout() wird next() aufgerufen
    // Suffix "$" wird als "Finnish Notation" bezeichnet https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b
    readonly isLoggedIn$ = new Subject<boolean>();

    // public fuer z.B. nav.component mit der Property isAdmin
    readonly rollen$ = new Subject<string[]>();

    constructor(private readonly basicAuthService: BasicAuthService) {
        // OnInit ist nur bei @Component moeglich
        if (this.isLoggedIn) {
            log.debug('AuthService.constructor: bereits eingeloggt');
            this.isLoggedIn$.next(true);

            const rollen = this.roles;
            if (rollen.length > 0) {
                log.debug('AuthService.constructor: rollen=', rollen);
                this.rollen$.next(rollen);
            }

            return;
        }

        log.debug('AuthService.constructor: noch nicht eingeloggt');
        this.isLoggedIn$.next(false);
    }

    /**
     * @param username als String
     * @param password als String
     * @return void
     */
    login(username: string | undefined, password: string | undefined) {
        log.debug(
            `AuthService.login: username=${username}, password=${password}`,
        );

        this.basicAuthService
            .login(username, password)
            .pipe(
                // den 1. Datensatz empfangen und danach implizites "unsubscribe"
                first(),
                tap(result => this.#handleLogin(result)),
            )
            .subscribe();
    }

    #handleLogin(result: string[] | undefined) {
        log.debug('AuthService.login: result', result);
        if (result === undefined) {
            this.isLoggedIn$.next(false);
            this.rollen$.next([]);
        } else {
            this.isLoggedIn$.next(true);
            this.rollen$.next(result);
        }
    }

    /**
     * @return void
     */
    logout() {
        log.debug('AuthService.logout()');
        deleteAuthorization();
        this.isLoggedIn$.next(false);
        this.rollen$.next([]);
    }

    /**
     * @return String fuer JWT oder Basic-Authentifizierung
     */
    get authorization() {
        return getAuthorization();
    }

    /**
     * Statische Abfrage, z.B. beim Start des Browsers, wenn noch kein
     * Click-Ereignis eingetreten ist.
     * @return true, falls ein User eingeloggt ist; sonst false.
     */
    get isLoggedIn() {
        return getAuthorization() !== undefined;
    }

    /**
     * Statische Abfrage, z.B. beim Start des Browsers, wenn noch kein
     * Click-Ereignis eingetreten ist oder bei der Anzeige des Suchergebnisses.
     * @return true, falls ein User in der Rolle "admin" eingeloggt ist;
     *         sonst false.
     */
    get isAdmin() {
        return getRoles().includes(ROLLE_ADMIN);
    }

    /**
     * Statische Abfrage, z.B. beim Start des Browsers, wenn noch kein
     * Click-Ereignis eingetreten ist oder bei der Anzeige des Suchergebnisses.
     * @return Array der vorhandenen Rollen.
     */
    get roles() {
        return getRoles();
    }
}
