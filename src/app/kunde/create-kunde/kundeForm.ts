import { type Kunde type KundeShared } from '../shared/kunde';

export interface KundeForm extends KundeShared {

}

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

}
