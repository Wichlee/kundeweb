import {
    type Kunde,
    type KundeShared,
    type WaehrungType,
} from '../shared/kunde';
import { Temporal } from '@js-temporal/polyfill';
import type { User } from '../shared/user';

import log from 'loglevel';

/**
 * Daten aus einem Formular:
 * - je 1 Control fuer jede Checkbox und
 * - außerdem Strings für Eingabefelder für Zahlen.
 */
export interface KundeForm extends KundeShared {
    geburtsdatum: Date;
    betrag: number;
    waehrung: WaehrungType;
    plz: string;
    ort: string;
    sport: boolean;
    lesen: boolean;
    reisen: boolean;
}

/**
 * Daten aus einem Formular für den User
 */
export interface UserForm {
    username: string;
    password: string;
}

/**
 * Ein User-Objekt mit Json-Objekt aus einem Formular erzeugen
 * @param userForm Json-Objekt mit Daten aus dem Formular
 * @returns Das initialisierte User-Objekt
 */
export const toUser = (userForm: UserForm): User => {
    log.debug('toUser: userForm=', userForm);

    const { username, password } = userForm;

    const user: User = {
        username,
        password,
    };
    log.debug('toUser: user=', user);
    return user;
};

/**
 * Ein Kunde-Objekt mit JSON-Objekt aus einem Formular erzeugen
 * @param kundeForm JSON-Objekt mit Daten aus dem Formular
 * @return Das initialisierte Kunde-Objekt
 */
// eslint-disable-next-line max-lines-per-function
export const toKunde = (kundeForm: KundeForm): Kunde => {
    log.debug('toKunde: kundeForm=', kundeForm);

    const {
        nachname,
        email,
        kategorie,
        hasNewsletter,
        geburtsdatum,
        homepage,
        geschlecht,
        familienstand,
        sport,
        lesen,
        reisen,
        betrag,
        waehrung,
        plz,
        ort,
    } = kundeForm;

    const geburtsdatumTemporal = new Temporal.PlainDate(
        geburtsdatum.getFullYear(),
        geburtsdatum.getMonth() + 1,
        geburtsdatum.getDate(),
    );

    const interessen: string[] = [];
    if (sport) {
        interessen.push('S');
    }
    if (lesen) {
        interessen.push('L');
    }
    if (reisen) {
        interessen.push('R');
    }

    const kunde: Kunde = {
        id: undefined,
        nachname,
        email,
        kategorie,
        hasNewsletter,
        geburtsdatum: geburtsdatumTemporal,
        homepage,
        geschlecht,
        familienstand,
        interessen,
        umsatz: {
            id: undefined,
            betrag,
            waehrung,
        },
        adresse: {
            id: undefined,
            plz,
            ort,
        },
        version: 0,
    };
    log.debug('toKunde: kunde=', kunde);
    return kunde;
};
