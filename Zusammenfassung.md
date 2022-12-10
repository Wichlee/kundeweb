# Zusammenfassung

<!--
  Copyright (C) 2020 - present Juergen Zimmermann, Hochschule Karlsruhe

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<Juergen.Zimmermann@HS-Karlsruhe.de>

GPL v3

## Systemarchitektur

- Browser
- Webserver: _Reverse Proxy_ vs. _CORS_
- Appserver
- DB-System

## Chrome und DevTools

- `log.debug()`, `log.warn()`, `log.error()`
- Debugger mit Breakpoints und _Source Mapping_ für \*.ts
- Angular-Plugin für Komponentenbaum

## Angular

- SPA
- PWA
- Zustandsdiagramme
- _kleine_ Komponenten (und Module) -- MVC-Pattern ist aus den **80er** Jahren
- _Klassen_ für Komponenten vs. _Funktionen_ bei React
- _Routing_ mit _Lazy Loading_
- `@NgModule`
- `@Component`
- `@Injectable`
- _Constructor Injection_
- _Single Component Modules_
- `ngOnInit()` mit Interface `OnInit`
- `@Output()` und `(...)` in HTML-Templates
- `@Input()` und `[...]` in HTML-Templates
- Formulare mit `[(ngModel)]` und `name` in HTML-Templates
- Formulare mit `FormGroup`, `FormControl` und Validierung sowie `formControlName`
- `HttpClient` mit `get<T>()`, `post()`, `put()` und `delete()`
- `*ngIf` für z.B. fehlende Daten, authentifiziert oder notwendige Berechtigungen
- `*ngFor` für z.B. dynamische Tabellen oder Checkboxes
- `*ngSwitch`, `*ngSwitchCase` und `*ngSwitchDefault`
- Geschütztes Routing mit `canActivate` und dem Interface `CanActivate`
- Routing mit `canDeactivate` und dem Interface `CanDeactivate`
- _CLI_ mit `ng`
- _webpack dev server_ mit _live reload_

## RxJS

- `Subject.next()` für @Output()

## Bootstrap

- Gridsystem
- CSS-Klassen
- Mobile First
- statische und dynamische Tabellen einschl. Zebrastil
- Navigationsleiste einschl. _Overflow Menu_ bzw. _Burger Icon_

## Material Icons

- CSS-Klasse
- `<span>`

## HTML 5

- DOCTYPE
- Sectioning Tags
  - header
  - nav
  - main
  - section
  - foot
- Placeholder bei input
- ...

## Stylelint

## Cypress

## Buildpacks mit nginx
