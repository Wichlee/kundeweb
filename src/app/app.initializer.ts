/*
 * Copyright (C) 2021 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { APP_INITIALIZER, type FactoryProvider, VERSION } from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import { environment } from '../environments/environment';
// statt console.log(...)
import log from 'loglevel';

export const appInitializer = () => () => {
    if (environment.production) {
        log.disableAll();
        return;
    }

    log.enableAll();
    log.debug('appInitializer()');
    log.debug(`Angular ${VERSION.full}: Die Webanwendung wird gestartet`);
    log.debug(Temporal.Now.zonedDateTimeISO().toLocaleString());
    log.debug('Check https://frontendchecklist.io');

    try {
        // eslint-disable-next-line no-eval
        eval(
            'class C { #priv() { console.log("ES 2022 wird z.T. unterstuetzt"); } pub() { this.#priv(); }} const c = new C(); c.pub();',
        );
        // optional catch binding seit ES 2019
    } catch {
        log.warn('ES 2022 wird NICHT unterstuetzt.');
    }
};

export const APP_INITIALIZER_PROVIDER: FactoryProvider = {
    // Aufruf waehrend der Initialisierung
    provide: APP_INITIALIZER,
    useFactory: appInitializer,
    multi: true,
};
