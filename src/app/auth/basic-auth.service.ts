/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
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
    HttpErrorResponse,
    HttpHeaders,
    type HttpResponse,
} from '@angular/common/http';
import { catchError, first, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import log from 'loglevel';
import { of } from 'rxjs';
import { paths } from '../shared/paths';
import { saveAuthorization } from './storage.service';

type Rolle = 'ACTUATOR' | 'ADMIN' | 'KUNDE';

export interface Identity {
    username: string;
    rollen: Rolle[];
    password?: string;
}

@Injectable({ providedIn: 'root' })
export class BasicAuthService {
    constructor(private readonly httpClient: HttpClient) {
        log.debug('BasicAuthService.constructor()');
    }

    /**
     * @param username als String
     * @param password als String
     * @return void
     */
    login(username: string | undefined, password: string | undefined) {
        log.debug(
            `BasicAuthService.login: username=${username}, password=${password}`,
        );
        if (username === undefined || password === undefined) {
            return of();
        }

        const loginPath = `${paths.login}/auth/rollen`;
        log.debug('BasicAuthService.login: loginPath=', loginPath);

        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'text/plain',
        });
        /* eslint-enable @typescript-eslint/naming-convention */

        return this.httpClient
            .post<Rolle[]>(
                loginPath,
                `username=${username}&password=${password}`,
                {
                    headers,
                    observe: 'response',
                    responseType: 'json',
                },
            )
            .pipe(
                // den 1. Datensatz empfangen und danach implizites "unsubscribe"
                first(),
                catchError((err: unknown) => {
                    log.debug('JwtService.login: err=', err);
                    // z.B. Statuscode 401 (Unauthorized) oder 504 (Gateway Timeout)
                    return of(err as HttpErrorResponse);
                }),

                map(result => this.#handleLogin(result, username, password)),
            );
    }

    #handleLogin(
        result: HttpErrorResponse | HttpResponse<Rolle[]>,
        username: string,
        password: string,
    ) {
        if (result instanceof HttpErrorResponse) {
            log.error('BasicAuthService.login: result=', result);
            // TODO Fehlerbehandlung fuer falsche Logindaten
            return;
        }
        const { status, ok, body } = result;
        log.debug('BasicAuthService.login: status=', status);
        log.debug('BasicAuthService.login: body', body);
        if (!ok || body === null) {
            const { statusText } = result;
            log.error('JwtService.login: statusText', statusText);
            return;
        }

        const base64 = window.btoa(`${username}:${password}`);
        const basicAuth = `Basic ${base64}`;
        const roles = body;

        saveAuthorization(basicAuth, roles);
        return roles;
    }
}
