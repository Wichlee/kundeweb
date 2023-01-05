import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MAX_KATEGORIE, MIN_KATEGORIE } from '../shared/kunde';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-kategorie&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-kategorie',
    templateUrl: './create-kategorie.component.html',
    imports: [FormsModule, ReactiveFormsModule],
    standalone: true,
})
export class CreateKategorieComponent implements OnInit {
    @Input()
    form!: FormGroup;

    kategorie = new FormControl(undefined, [
        Validators.required,
        Validators.min(MIN_KATEGORIE),
        Validators.max(MAX_KATEGORIE),
    ]);

    ngOnInit() {
        log.debug('CreateKategorieComponent.ngOnInit');
        this.form.addControl('kategorie', this.kategorie);
    }
}
