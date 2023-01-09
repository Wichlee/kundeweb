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

export type FamilienstandType =
    | 'GESCHIEDEN'
    | 'LEDIG'
    | 'VERHEIRATET'
    | 'VERWITWET';

export type GeschlechtType = 'DIVERS' | 'MAENNLICH' | 'WEIBLICH';

export const NACHNAME_REGEX =
    // eslint-disable-next-line max-len, unicorn/no-unsafe-regex
    /^(o'|von|von der|von und zu|van)?[A-ZÄÖÜ][a-zäöüß]+(-[A-ZÄÖÜ][a-zäöüß]+)?/u;

export const EMAIL_REGEX = /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/u;

// eslint-disable-next-line unicorn/no-unsafe-regex
export const HOMEPAGE_REGEX = /^(https?:\/\/)?[a-z\d.-]+\.[a-z]{2,4}$/u;

/**
 * Adresse Model als Plain-Old-JavaScript-Object (POJO) fuer das Kunde-Objekt.
 */
export interface AdresseType {
    id: string | undefined;
    plz: string;
    ort: string;
}

export type WaehrungType = 'CHF' | 'EUR' | 'GBP' | 'USD';

export interface UmsatzType {
    id: string | undefined;
    betrag: number;
    waehrung: WaehrungType;
}

export const PLZ_REGEX = /^\d{5}$/u;

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
    geschlecht: GeschlechtType;
    familienstand: FamilienstandType;
    interessen: string[];
    umsatz: UmsatzType;
    adresse: AdresseType;
    username: string;
}

/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Kundendaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 * Verwendung in den Interfaces:
 * - KundeServer für KundeReadService
 * - KundeForm für CreateKundeComponent
 */
export interface KundeShared {
    nachname: string;
    email: string;
    kategorie: number;
    hasNewsletter: boolean;
    homepage: URL;
    geschlecht: GeschlechtType;
    familienstand: FamilienstandType;
    umsatz: UmsatzType;
    adresse: AdresseType;
    username: string;
}
