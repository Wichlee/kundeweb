/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    HttpClient,
    type HttpErrorResponse,
    HttpHeaders,
    HttpResponse,
} from '@angular/common/http';
import { type Observable, of } from 'rxjs';
import { RemoveError, SaveError, UpdateError } from './errors';
import { catchError, first, map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { type Kunde } from './kunde';
// eslint-disable-next-line sort-imports
import { Injectable } from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';
import { paths } from '../../shared/paths';
import { toKundeServer } from './kundeServer';

// Methoden der Klasse HttpClient
//  * get(url, options) – HTTP GET request
//  * post(url, body, options) – HTTP POST request
//  * put(url, body, options) – HTTP PUT request
//  * patch(url, body, options) – HTTP PATCH request
//  * delete(url, options) – HTTP DELETE request

// Eine Service-Klasse ist eine "normale" Klasse gemaess ES 2015, die mittels
// DI in eine Komponente injiziert werden kann, falls sie innerhalb von
// provider: [...] bei einem Modul bereitgestellt wird.
// Eine Komponente realisiert gemaess MVC-Pattern den Controller und die View.
// Die Anwendungslogik wird vom Controller an Service-Klassen delegiert.

/**
 * Die Service-Klasse zu Kunden wird zum "Root Application Injector"
 * hinzugefuegt und ist in allen Klassen der Webanwendung verfuegbar.
 */
@Injectable({ providedIn: 'root' })
export class KundeWriteService {
    readonly #baseUrl = paths.base;

    /**
     * @param httpClient injizierter Service HttpClient (von Angular)
     * @return void
     */
    constructor(
        private readonly httpClient: HttpClient,
        private readonly authService: AuthService,
    ) {
        log.debug('KundeWriteService.constructor: baseUrl=', this.#baseUrl);
    }

    /**
     * Einen neuen Kunden anlegen
     * @param neuerKunde Das JSON-Objekt mit dem neuen Kunden
     */
    save(kunde: Kunde): Observable<SaveError | string> {
        log.debug('KundeWriteService.save: kunde=', kunde);
        kunde.geburtsdatum = Temporal.Now.plainDateISO();
        log.debug('KundeWriteService.save: kunde=', kunde);

        const authorizationStr = `${this.authService.authorization}`;
        log.debug(
            'KundeWriteService.save: authorizationStr=',
            authorizationStr,
        );

        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: authorizationStr,
            Accept: 'text/plain',
        });
        /* eslint-enable @typescript-eslint/naming-convention */

        return this.httpClient
            .post(this.#baseUrl, toKundeServer(kunde), {
                headers,
                observe: 'response',
                responseType: 'text',
            })
            .pipe(
                first(),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                catchError((err: unknown, _$) => {
                    const errResponse = err as HttpErrorResponse;
                    return of(new SaveError(errResponse.status, errResponse));
                }),

                // entweder Observable<HttpResponse<string>> oder Observable<SaveError>
                map(result => this.#mapSaveResultToId(result)),
            );
    }

    #mapSaveResultToId(
        result: HttpResponse<string> | SaveError,
    ): SaveError | string {
        if (!(result instanceof HttpResponse)) {
            return result;
        }

        const response = result;
        log.debug(
            'KundeWriteService.#mapSaveResultToId: map: response',
            response,
        );

        // id aus Header "Locaction" extrahieren
        const location = response.headers.get('Location');
        const id = location?.slice(location.lastIndexOf('/') + 1);

        if (id === undefined) {
            return new SaveError(-1, 'Keine Id');
        }

        return id;
    }

    /**
     * Einen vorhandenen Kunden aktualisieren
     * @param kunde Das JSON-Objekt mit den aktualisierten Kundendaten
     */
    update(kunde: Kunde): Observable<Kunde | UpdateError> {
        log.debug('KundeWriteService.update: kunde=', kunde);

        // id, version und schlagwoerter gehoeren nicht zu den serverseitigen Nutzdaten
        const { id, version, interessen, ...kundeDTO } = kunde; // eslint-disable-line @typescript-eslint/no-unused-vars
        if (version === undefined) {
            const msg = `Keine Versionsnummer fuer den Kunden ${id}`;
            log.debug(msg);
            return of(new UpdateError(-1, msg));
        }

        const url = `${this.#baseUrl}/${id}`;

        const authorizationStr = `${this.authService.authorization}`;
        log.debug(
            'KundeWriteService.update: authorizationStr=',
            authorizationStr,
        );

        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'If-Match': `"${version}"`,
            Authorization: authorizationStr,
            Accept: 'text/plain',
        });
        /* eslint-enable @typescript-eslint/naming-convention */
        log.debug('KundeWriteService.update: headers=', headers);

        log.debug('KundeWriteService.update: kundeDTO=', kundeDTO);
        return this.httpClient
            .put(url, kundeDTO, { headers, observe: 'response' })
            .pipe(
                first(),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                catchError((err: unknown, _$) => {
                    const errResponse = err as HttpErrorResponse;
                    log.debug('KundeWriteService.update: err=', err);
                    return of(new UpdateError(errResponse.status, errResponse));
                }),

                map(result => this.#mapUpdateResultToVersion(result)),

                map(versionOderError => {
                    if (versionOderError instanceof UpdateError) {
                        return versionOderError;
                    }
                    kunde.version = versionOderError;
                    return kunde;
                }),
            );
    }

    #mapUpdateResultToVersion(
        result: HttpResponse<unknown> | UpdateError,
    ): UpdateError | number {
        if (result instanceof UpdateError) {
            return result;
        }

        const response = result;
        log.debug(
            'KundeWriteService.#mapUpdateResultToVersion: response',
            response,
        );
        const etag = response.headers.get('ETag');
        log.debug('KundeWriteService.#mapUpdateResultToVersion: etag=', etag);

        const ende = etag?.lastIndexOf('"');
        const versionStr = etag?.slice(1, ende) ?? '1';
        return Number.parseInt(versionStr, 10);
    }

    /**
     * Einen Kunden l&ouml;schen
     * @param kunde Das JSON-Objekt mit dem zu loeschenden Kunden
     */
    remove(kunde: Kunde): Observable<Record<string, unknown> | RemoveError> {
        log.debug('KundeWriteService.remove: kunde=', kunde);
        const url = `${this.#baseUrl}/${kunde.id}`;

        const authorizationStr = `${this.authService.authorization}`;
        log.debug(
            'KundeWriteService.remove: authorizationStr=',
            authorizationStr,
        );

        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = new HttpHeaders({
            Authorization: authorizationStr,
            Accept: 'text/plain',
        });
        /* eslint-enable @typescript-eslint/naming-convention */

        return this.httpClient.delete(url, { headers }).pipe(
            first(),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            catchError((err: unknown, _$) => {
                const errResponse = err as HttpErrorResponse;
                return of(new RemoveError(errResponse.status));
            }),

            map(result => {
                if (result instanceof RemoveError) {
                    return result;
                }
                return {};
            }),
        );
    }
}
