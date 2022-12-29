import { type Kunde, type KundeShared } from '../shared/kunde';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede Checkbox und
 *  <li> außerdem Strings für Eingabefelder für Zahlen.
 * </ul>
 */
export interface KundeForm extends KundeShared {
    geburtsdatum: Date;
    sport: boolean;
    lesen: boolean;
    reisen: boolean;
}

/**
 * Ein Kunde-Objekt mit JSON-Objekt aus einem Formular erzeugen
 * @param kunde JSON-Objekt mit Daten aus dem Formular
 * @return Das initialisierte Kunde-Objekt
 */
export const toKunde = (kundeForm: KundeForm): Kunde => {
    log.debug('toKunde: kundeForm=', kundeForm);

    const {
        nachname,
        email,
        kategorie,
        hasNewsletter,
        geburtsdatum,
        homepage,
        rabatt,
        geschlecht,
        familienstand,
        sport, // Interessen als bools, da diese eine Liste sind -> siehe kunde.ts
        lesen,
        reisen,
        umsatz,
        adresse,
        username,
    } = kundeForm;

    const geburtsdatum;

    const interessen: string[] = [];
    if (sport) {
        interessen.push('SPORT');
    }
    if (lesen) {
        interessen.push('LESEN');
    }
    if (reisen) {
        interessen.push('REISEN');
    }

    const kunde: Kunde = {
        id: undefined,
        nachname,
        email,
        kategorie,
        hasNewsletter,
        geburtsdatum,
        homepage,
        rabatt,
        geschlecht,
        familienstand,
        interessen,
        umsatz,
        adresse,
        username,
        version: 0,
    };
    log.debug('toKunde: kunde=', kunde);
    return kunde;
};
