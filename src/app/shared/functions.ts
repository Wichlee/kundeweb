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

// siehe ts\src\core\facade\lang.ts

/**
 * Ein Benutzernamen und ein Passwort werden zu einem String zusammengefasst und
 * dabei durch einen Doppelpunkt (:) getrennt. Dieser String wird
 * anschlie&szlig;end mit Base64 codiert. Das Ergebnis kann dann f&uuml;
 * BASIC-Authentifizierung verwendet werden.
 * http://stackoverflow.com/questions/34177221/angular2-how-to-inject-window-into-an-angular2-service
 * https://gist.github.com/gdi2290/f8a524cdfb1f54f1a59c
 * @param username Der Benutzername
 * @param password Das Passwort
 * @return Der mit Base64 codierte String.
 */
export const toBase64 = (username: string, password: string) =>
    window.btoa(`${username}:${password}`);

// In Angular durch Pipes wie z.B. currency oder percent
// export const toEuro = (value: number) => {
//     const options = {
//         minimumIntegerDigits: 1,
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//         style: 'currency',
//         currency: 'eur',
//         currencyDisplay: 'symbol'
//     }
//     return new Intl.NumberFormat('de', options).format(value)
// }
//
// export const toProzent(value: number) => {
//     const options = {
//         minimumIntegerDigits: 1,
//         minimumFractionDigits: 1,
//         maximumFractionDigits: 2,
//         style: 'percent'
//     }
//     return new Intl.NumberFormat('de', options).format(value)
// }
