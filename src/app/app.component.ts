/*
 * Copyright (C) 2018 - present Juergen Zimmermann, Hochschule Karlsruhe
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

// "core" enthaelt Funktionalitaet, damit die Webanwendung im Browser laeuft
import { Component } from '@angular/core';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
// statt console.log(...)
import log from 'loglevel';

// JIT (= Just-in-time) Compiler: Uebersetzung zur Laufzeit, d.h. dynamisch
// AoT (= Ahead-of-Time) Compiler: statische Übersetzung fuehrt zu weniger Code bzw. kleinerem Bundle

// Web-Komponente ("web component"): Zusammenfassung von
//  * HTML-Fragment
//  * Shadow DOM fuer das HTML-Fragment
//  * CSS-Stil fuer das HTML-Fragment
//  * Logik durch JavaScript
// https://developer.mozilla.org/docs/Web/Web_Components
// https://developer.mozilla.org/docs/Web/Web_Components/Shadow_DOM

// "Composite Pattern" bei UIs: Eine UI-Komponente besteht aus wiederum aus
// einfachen UI-Komponenten, z.B. ein Suchformular besteht aus einem Label,
// einem Eingabefeld und einem Button.

// Eine Komponente (= funktionale Einheit) ist an das MVC-Pattern angelehnt:
// sie besteht aus einem HTML-Template (= View) und der zugehoerigen
// Dialogsteuerung (= Controller) mit dem Model als Bindeglied.
// Controller sind klein ("Thin Controllers") und die Anwendungslogik wird
// in die Service-Klassen ausgelagert.
// Innerhalb der Wurzelkomponente werden die Kindkomponenten geladen.
// https://angular.io/docs/js/latest/api/annotations/ComponentAnnotation-class.html

// Metadaten-Annotationen in Angular sind z.B. @Component.
// Annotationen sind ein Spezialfall der Decorators:
// Ein Decorator *ergaenzt* die vorhandene Funktionalitaet von einer Klasse oder
// einer Methode oder einem Attribut oder einem Methodenargument.
// siehe https://github.com/wycats/javascript-decorators

/**
 * Wurzelkomponente mit dem Tag &lt;hs-root&gt;
 */
@Component({
    // Schnittstelle der View fuer Wiederverwendung in anderen Komponenten:
    // durch den CSS-Selector hs-root in index.html:
    // Beispiel:
    //   <hs-root>
    //       <hs-header>
    //           ...
    //       </hs-header>
    //       <hs-main>
    //           <router-outlet>
    //               <hs-suche-buecher>
    //                   <hs-suchformular>
    //                       ...
    //                   </hs-suchformular>
    //                   <hs-suchergebnis>
    //                       ...
    //                   </hs-suchergebnis>
    //               </hs-suche-buecher>
    //           <router-outlet>
    //       </hs-main>
    //   </hs-root>
    selector: 'hs-root',

    // "template - A document or file having a preset format, used as a
    // starting point for a particular application so that the format does not
    // have to be recreated each time it is used."
    // Siehe http://www.thefreedictionary.com/template
    // HTML-Templates ~ View bei MVC: das Model referenzieren u. den Controller
    // aufrufen.
    templateUrl: './app.component.html',

    imports: [FooterComponent, HeaderComponent, MainComponent],
    standalone: true,
})

// Definitionsklasse ~ Controller: Eingabedaten entgegennehmen, Model fuer die
// View aktualisieren, Funktionen fuer die Benutzer-Interaktion bereitstellen,
// z.B. onClick oder onSubmit
export class AppComponent {
    constructor() {
        log.debug('AppComponent.constructor()');
    }
}
