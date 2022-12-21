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
import { type Temporal } from '@js-temporal/polyfill';

export const MAX_RATING = 5;

export type Verlag = 'BAR_VERLAG' | 'FOO_VERLAG';

export type BuchArt = 'DRUCKAUSGABE' | 'KINDLE';

export const ISBN_REGEX =
    /\d{3}-\d-\d{5}-\d{3}-\d|\d-\d{5}-\d{3}-\d|\d{13}|\d{10}/u;

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export interface Buch {
    id: string | undefined;
    version: number | undefined;
    titel: string;
    rating: number | undefined;
    art: BuchArt;
    verlag: Verlag | '' | undefined;
    datum: Temporal.PlainDate | undefined;
    preis: number;
    rabatt: number;
    lieferbar: boolean | undefined;
    schlagwoerter: string[];
    isbn: string;
}

/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Buchdaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 * Verwendung in den Interfaces:
 * - BuchServer für BuchReadService
 * - BuchForm für CreateBuchComponent
 */
export interface BuchShared {
    titel: string | undefined;
    verlag?: Verlag | '';
    art: BuchArt;
    preis: number;
    rabatt: number | undefined;
    lieferbar?: boolean;
    isbn: string;
}
