import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-familienstand&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-familienstand',
    templateUrl: './create-familienstand.component.html',
    imports: [FormsModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class CreateFamilienstandComponent implements OnInit {
    @Input()
    form!: FormGroup;

    familienstand = new FormControl(undefined, Validators.required);

    ngOnInit() {
        log.debug('CreateFamilienstandComponent.ngOnInit');
        this.form.addControl('familienstand', this.familienstand);
    }
}
