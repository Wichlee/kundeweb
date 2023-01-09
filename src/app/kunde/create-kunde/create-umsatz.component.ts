import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-umsatz&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-umsatz',
    templateUrl: './create-umsatz.component.html',
    imports: [
        FormsModule,
        MatIconModule,
        MatInputModule,
        NgIf,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class CreateUmsatzComponent implements OnInit {
    @Input()
    form!: FormGroup;

    protected readonly umsatz = new FormControl(undefined, Validators.required);

    ngOnInit() {
        log.debug('CreateUmsatzComponent.ngOnInit');
        this.form.addControl('umsatz', this.umsatz);
    }
}
