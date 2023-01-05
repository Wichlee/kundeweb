import { Component, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { type GeschlechtType } from '../../shared/kunde';
import { Subject } from 'rxjs';
import { SucheEmailComponent } from './suche-email.component';
import { SucheGeschlechtComponent } from './suche-geschlecht.component';
import { SucheInteressenComponent } from './suche-interessen.component';
import { SucheNachnameComponent } from './suche-nachname.component';
import { type Suchkriterien } from '../../shared/kundeRead.service';
import { fadeIn } from '../../../shared/animations';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suchformular</code>
 */
@Component({
    selector: 'hs-suchformular',
    templateUrl: './suchformular.component.html',
    animations: [fadeIn],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SucheEmailComponent,
        SucheGeschlechtComponent,
        SucheInteressenComponent,
        SucheNachnameComponent,
    ],
    standalone: true,
})
export class SuchformularComponent {
    @Output()
    protected readonly suchkriterien$ = new Subject<Suchkriterien>();

    #nachname = '';

    #email = '';

    #geschlecht: GeschlechtType | '' = '';

    #sport = false;

    #lesen = false;

    #reisen = false;

    constructor() {
        log.debug('SuchformularComponent.constructor()');
    }

    setNachname(nachname: string) {
        log.debug('SuchformularComponent.setNachname', nachname);
        this.#nachname = nachname;
    }

    setEmail(email: string) {
        log.debug('SuchformularComponent.setEmail', email);
        this.#email = email;
    }

    setGeschlecht(geschlecht: string) {
        log.debug('SuchformularComponent.setGeschlecht', geschlecht);
        this.#geschlecht = geschlecht as GeschlechtType;
    }

    setSport(isChecked: boolean) {
        log.debug('SuchformularComponent.setSport', isChecked);
        this.#sport = isChecked;
    }

    setLesen(isChecked: boolean) {
        log.debug('SuchformularComponent.setLesen', isChecked);
        this.#lesen = isChecked;
    }

    setReisen(isChecked: boolean) {
        log.debug('SuchformularComponent.setReisen', isChecked);
        this.#reisen = isChecked;
    }

    /**
     * Suche nach Kunden, die den spezfizierten Suchkriterien entsprechen
     */
    onSubmit() {
        log.debug(
            'SuchformularComponent.onSubmit: nachname / email / geschlecht / sport / lesen / reisen',
            this.#nachname,
            this.#email,
            this.#geschlecht,
            this.#sport,
            this.#lesen,
            this.#reisen,
        );

        this.suchkriterien$.next({
            nachname: this.#nachname,
            email: this.#email,
            geschlecht: this.#geschlecht,
            interessen: {
                sport: this.#sport,
                lesen: this.#lesen,
                reisen: this.#reisen,
            },
        });
    }
}
