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

export const MIN_KATEGORIE = 0;

export const MAX_KATEGORIE = 9;

export type Adresse = 'BAR_VERLAG' | 'FOO_VERLAG';

export type Familienstand = 'LEDIG' | 'VERHEIRATET' | 'GESCHIEDEN' | 'VERWITWET';

export type Geschlecht = 'MAENNLICH' | 'WEIBLICH' | 'DIVERS';

export type Interesse = 'SPORT' | 'LESEN' | 'REISEN';

export type Umsatz = null;

export const NACHNAME_REGEX = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export interface Kunde {
    id: string | undefined;
    version: number | undefined;
    nachname: string;
    email: string;
    kategorie: number;
    hasNewsletter: boolean;
    geburtsdatum: Temporal.PlainDate | undefined;
    homepage: URL;
    rabatt: number;
    geschlecht: Geschlecht;
    familienstand: Familienstand;
    interessen: string[];
    umsatz: Umsatz;
    adresse: Adresse;
    username: string;
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
