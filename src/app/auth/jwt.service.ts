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
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';
import { of } from 'rxjs';
import { paths } from '../shared/paths';
import { saveAuthorization } from './storage.service';

interface LoginResponse {
    token: string;
    roles: string[];
}

@Injectable({ providedIn: 'root' })
export class JwtService {
    private static readonly NANOS_PER_MILLIS = 1_000_000;

    private static readonly MILLIS_PER_SECOND = 1000;

    private static readonly TIMEZONE_OFFSET_MS =
        Temporal.Now.timeZone().getOffsetNanosecondsFor(
            Temporal.Now.instant(),
        ) / JwtService.NANOS_PER_MILLIS;

    constructor(private readonly httpClient: HttpClient) {
        log.debug('JwtService.constructor()');
    }

    login(username: string | undefined, password: string | undefined) {
        const loginPath = paths.login;
        log.debug('JwtService.login: loginPath=', loginPath);

        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'text/plain',
        });
        /* eslint-enable @typescript-eslint/naming-convention */

        return this.httpClient
            .post<LoginResponse>(
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

                map(result => this.#handleLogin(result)),
            );
    }

    #handleLogin(result: HttpErrorResponse | HttpResponse<LoginResponse>) {
        if (result instanceof HttpErrorResponse) {
            log.error('JwtService.login: result=', result);
            // TODO Fehlerbehandlung fuer falsche Logindaten
            return;
        }
        const { status, ok, body } = result;
        log.debug('JwtService.login: status=', status);
        log.debug('JwtService.login: body', body);
        if (!ok || body === null) {
            const { statusText } = result;
            log.error('JwtService.login: statusText', statusText);
            return;
        }

        const { token, roles } = body;
        const authorization = `Bearer ${token}`;
        log.debug('JwtService.login: authorization=', authorization);

        const decodedToken = this.#decodeToken(token); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        log.debug('JwtService.login: decodedToken', decodedToken);
        if (decodedToken.exp === undefined) {
            log.warn('JwtService.login: exp fehlt');
            return;
        }
        // Expiration beim Token: Sekunden seit 1.1.1970 UTC
        // Cookie: Millisekunden in eigener Zeitzone
        const expiration =
            decodedToken.exp * JwtService.MILLIS_PER_SECOND +
            JwtService.TIMEZONE_OFFSET_MS;
        log.debug('JwtService.login: expiration=', expiration);

        saveAuthorization(authorization, roles, expiration);
        return roles;
    }

    // https://github.com/auth0/angular2-jwt/blob/master/angular2-jwt.ts#L147
    #decodeToken(token: string) {
        // Destructuring
        const [, payload, signature] = token.split('.') as (
            | string
            | undefined
        )[];
        if (signature === undefined) {
            log.error('JwtService.#decodeToken: JWT enthaelt keine Signature');
            return;
        }

        let base64Token = payload?.replace(/-/gu, '+')?.replace(/_/gu, '/');
        if (base64Token === undefined) {
            return Promise.reject(new Error('Interner Fehler beim Einloggen'));
        }
        /* eslint-disable @typescript-eslint/no-magic-numbers */
        switch (base64Token.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                base64Token += '==';
                break;
            }
            case 3: {
                base64Token += '=';
                break;
            }
            default: {
                log.error(
                    'JwtService.#decodeToken: Laenge des JWT in Base64 ist falsch.',
                );
                return;
            }
        }
        /* eslint-enable @typescript-eslint/no-magic-numbers */

        // http://xkr.us/articles/javascript/encode-compare
        // http://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent#23842171
        const decodedStr = decodeURIComponent(
            encodeURIComponent(window.atob(base64Token)),
        );

        return JSON.parse(decodedStr);
    }
}
