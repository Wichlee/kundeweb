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
import { type Buch, type BuchShared } from './kunde';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

interface Link {
    href: string;
}

/**
 * Daten vom und zum REST-Server:
 * <ul>
 *  <li> Arrays f&uuml;r mehrere Werte, die in einem Formular als Checkbox
 *       dargestellt werden.
 *  <li> Daten mit Zahlen als Datentyp, die in einem Formular nur als
 *       String handhabbar sind.
 * </ul>
 */
export interface BuchServer extends BuchShared {
    rating?: number;
    datum?: string;
    schlagwoerter?: string[];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _links?: {
        self: Link;
        list?: Link;
        add?: Link;
        update?: Link;
        remove?: Link;
    };
}

/**
 * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
 * Service kommen.
 * @param buch JSON-Objekt mit Daten vom RESTful Web Server
 * @return Das initialisierte Buch-Objekt
 */
// eslint-disable-next-line max-lines-per-function
export const toBuch = (buchServer: BuchServer, etag?: string) => {
    let selfLink: string | undefined;
    const { _links } = buchServer; // eslint-disable-line @typescript-eslint/naming-convention
    if (_links !== undefined) {
        const { self } = _links;
        selfLink = self.href;
    }

    let id = 'N/A';
    if (selfLink !== undefined) {
        const lastSlash = selfLink.lastIndexOf('/');
        id = selfLink.slice(lastSlash + 1);
    }

    let version: number | undefined;
    if (etag !== undefined) {
        // Anfuehrungszeichen am Anfang und am Ende entfernen
        const versionStr = etag.slice(1, -1);
        version = Number.parseInt(versionStr, 10);
    }

    const {
        titel,
        rating,
        art,
        verlag,
        datum,
        preis,
        rabatt,
        lieferbar,
        schlagwoerter,
        isbn,
    } = buchServer;

    let datumTemporal: Temporal.PlainDate | undefined;
    // TODO Parsing, ob der Datum-String valide ist
    if (datum !== undefined) {
        const [yearStr, monthStr, dayStr] = datum
            .replace(/T.*/gu, '')
            .split('-');
        const year = Number(yearStr);
        const month = Number(monthStr);
        const day = Number(dayStr);
        datumTemporal = new Temporal.PlainDate(year, month, day);
    }

    const buch: Buch = {
        id,
        titel: titel ?? 'unbekannt',
        rating,
        art,
        verlag,
        datum: datumTemporal,
        preis,
        rabatt: rabatt ?? 0,
        lieferbar,
        schlagwoerter: schlagwoerter ?? [],
        isbn,
        version,
    };
    log.debug('Buch.fromServer: buch=', buch);
    return buch;
};

/**
 * Konvertierung des Buchobjektes in ein JSON-Objekt f&uuml;r den RESTful
 * Web Service.
 * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
 */
export const toBuchServer = (buch: Buch): BuchServer => {
    const datum =
        buch.datum === undefined
            ? Temporal.Now.plainDateTimeISO().toString()
            : buch.datum.toString();
    return {
        titel: buch.titel,
        rating: buch.rating ?? 0,
        art: buch.art,
        verlag: buch.verlag ?? '',
        datum,
        preis: buch.preis,
        rabatt: buch.rabatt,
        lieferbar: buch.lieferbar ?? false,
        schlagwoerter: buch.schlagwoerter,
        isbn: buch.isbn,
    };
};
