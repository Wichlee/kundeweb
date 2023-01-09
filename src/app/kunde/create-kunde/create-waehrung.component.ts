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
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-waehrung&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-waehrung',
    templateUrl: './create-waehrung.component.html',
    imports: [
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        NgIf,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class CreateWaehrungComponent implements OnInit {
    @Input()
    form!: FormGroup;

    waehrung = new FormControl(undefined, Validators.required);

    ngOnInit() {
        log.debug('CreateWaehrungComponent.ngOnInit');
        this.form.addControl('waehrung', this.waehrung);
    }
}
