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

// Alternativen: Local Storage oder Session-Cookies mit dem Token
// In Anlehnung an
// https://github.com/BCJTI/ng2-cookies/blob/master/src/services/cookie.ts

import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

// Namen der Cookies: nur als Speichermechanismus (nicht zum Server übertragen):
// Ablaufdatum oder Session-Cookie (Lebensdauer gebunden an Tab).
// Kein XSS (Cross-Site Scripting) wie bei Local Storage
// Evtl. CSRF (Cross-Site Request Forgery)

const AUTHORIZATION = 'authorization';
const ROLES = 'roles';
const SEPARATOR = ',';

/**
 * @param name Name des gesuchten Cookies
 * @return Werte des gefundenes Cookie oder undefined
 */
const getCookie = (name: string) => {
    const encodedName = encodeURIComponent(name);
    const regexp = new RegExp(
        `(?:^${encodedName}|;\\s*${encodedName})=(.*?)(?:;|$)`,
        'gu',
    );
    // alle Cookies durchsuchen
    const result = regexp.exec(document.cookie);
    if (result === null) {
        return;
    }
    const [, encoded] = result as (string | undefined)[];
    if (encoded === undefined) {
        return;
    }
    // z.B. %20 durch Leerzeichen ersetzen
    return decodeURIComponent(encoded);
};

/**
 * @param name Name des Cookies
 * @param value Wert des Cookies
 * @param expires Ablaufdatum in Millisekunden. Default: Session.
 * @param path Pfad des Cookies. Default: /.
 * @param domain Domain des Cookies. Default: aktuelle Domain.
 */
const setCookie = (
    name: string,
    value: string,
    expires?: number,
    path?: string,
    domain?: string,
    // eslint-disable-next-line max-params
) => {
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;

    if (expires !== undefined) {
        // TODO Das neue "Temporal API" bietet keine Konvertierung in einen UTC-String
        const expirationDate = new Date(expires);
        cookieStr += `expires=${expirationDate.toUTCString()};`;
    }
    if (path !== undefined) {
        cookieStr += `path=${path};`;
    }
    if (domain !== undefined) {
        cookieStr += `domain=${domain};`;
    }
    // Kein Zugriff mit JavaScript; Uebertragung nur mit HTTPS
    // cookieStr += 'HttpOnly; Secure;'

    // Uebertragung nur mit HTTPS
    cookieStr += 'Secure;';

    // Schutz vor XSS
    cookieStr += 'SameSite=Strict;';

    log.debug('StorageService.#setCookie: ', cookieStr);
    // neues Cookie anlegen
    document.cookie = cookieStr;

    // cookieStore ist nur bei HTTPS verfuegbar und nicht in jedem Browser
    // await cookieStore.set({
    //     name,
    //     value,
    //     expires: ...,
    //     domain,
    // });
};

/**
 * @param name Name des Cookies
 * @param path Pfad des Cookies. Default: /.
 * @param domain Domain des Cookies. Default: aktuelle Domain.
 */
const deleteCookie = (name: string, path?: string, domain?: string) => {
    if (getCookie(name) !== undefined) {
        // expires in der Vergangenheit
        setCookie(name, '', -1, path, domain);
    }
};

export const getAuthorization = () => getCookie(AUTHORIZATION);

export const saveAuthorization = (
    authorization: string,
    roles: string[],
    expirationInMillis: number = Temporal.Now.instant().add({ minutes: 60 })
        .epochMilliseconds,
) => {
    setCookie(AUTHORIZATION, authorization, expirationInMillis);
    // z.B. ['admin', 'mitarbeiter'] -> 'admin,mitarbeiter'
    const rolesStr: string = roles.join(SEPARATOR);
    log.debug('StorageService.saveAuthorization: rolesStr=', rolesStr);
    setCookie(ROLES, rolesStr, expirationInMillis);
};

export const getRoles = () => {
    // z.B. 'admin,mitarbeiter'
    const rolesStr = getCookie(ROLES);
    log.debug('StorageService.roles: rolesStr=', rolesStr);
    // z.B. ['admin', 'mitarbeiter']
    return rolesStr === undefined ? [] : rolesStr.split(SEPARATOR);
};

export const deleteAuthorization = () => {
    deleteCookie(AUTHORIZATION);
    deleteCookie(ROLES);
};
