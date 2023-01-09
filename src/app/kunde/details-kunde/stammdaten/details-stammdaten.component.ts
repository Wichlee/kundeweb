import { Component, Input, type OnInit } from '@angular/core';
import { DetailsBetragComponent } from './details-betrag.component';
import { DetailsEmailComponent } from './details-email.component';
import { DetailsFamilienstandComponent } from './details-familienstand.component';
import { DetailsGeburtsdatumComponent } from './details-geburtsdatum.component';
import { DetailsGeschlechtComponent } from './details-geschlecht.component';
import { DetailsHasNewsletterComponent } from './details-hasNewsletter.component';
import { DetailsKategorieComponent } from './details-kategorie.component';
import { DetailsNachnameComponent } from './details-nachname.component';
import { DetailsOrtComponent } from './details-ort.component';
import { DetailsPlzComponent } from './details-plz.component';
import { DetailsUsernameComponent } from './details-username.component';
import { DetailsWaehrungComponent } from './details-waehrung.component';
import { type Kunde } from '../../shared/kunde';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-stammdaten</code>
 */
@Component({
    selector: 'hs-details-stammdaten',
    templateUrl: './details-stammdaten.component.html',
    imports: [
        DetailsBetragComponent,
        DetailsEmailComponent,
        DetailsFamilienstandComponent,
        DetailsGeburtsdatumComponent,
        DetailsGeschlechtComponent,
        DetailsHasNewsletterComponent,
        DetailsKategorieComponent,
        DetailsNachnameComponent,
        DetailsOrtComponent,
        DetailsPlzComponent,
        DetailsUsernameComponent,
        DetailsWaehrungComponent,
        NgIf,
    ],
    standalone: true,
})
export class DetailsStammdatenComponent implements OnInit {
    // Property Binding: <hs-details-stammdaten [kunde]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    kunde!: Kunde;

    ngOnInit() {
        log.debug('DetailsStammdatenComponent.kunde=', this.kunde);
    }
}
