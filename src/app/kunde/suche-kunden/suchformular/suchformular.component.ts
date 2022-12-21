import { type InteresseType, type GeschlechtType } from '../../shared/kunde';
import { Component, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

    #email: string = '';

    #geschlecht: GeschlechtType | '' = '';

    #javascript = false;

    #typescript = false;

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

    setJavascript(isChecked: boolean) {
        log.debug('SuchformularComponent.setJavascript', isChecked);
        this.#javascript = isChecked;
    }

    setTypescript(isChecked: boolean) {
        log.debug('SuchformularComponent.setTypescript', isChecked);
        this.#typescript = isChecked;
    }

    /**
     * Suche nach Kunden, die den spezfizierten Suchkriterien entsprechen
     */
    onSubmit() {
        log.debug(
            'SuchformularComponent.onSubmit: nachname / email / geschlecht / javascript / typescript',
            this.#nachname,
            this.#email,
            this.#geschlecht,
            this.#javascript,
            this.#typescript,
        );

        this.suchkriterien$.next({
            nachname: this.#nachname,
            email: this.#email,
            geschlecht: this.#geschlecht,
            interessen: {
                javascript: this.#javascript,
                typescript: this.#typescript,
            },
        });
    }
}
