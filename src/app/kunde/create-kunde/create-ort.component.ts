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
import { ORT_REGEX } from '../shared/kunde';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-ort&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-ort',
    templateUrl: './create-ort.component.html',
    imports: [
        FormsModule,
        MatIconModule,
        MatInputModule,
        NgIf,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class CreateOrtComponent implements OnInit {
    @Input()
    form!: FormGroup;

    protected readonly ort = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(ORT_REGEX),
    ]);

    ngOnInit() {
        log.debug('CreateOrtComponent.ngOnInit');
        this.form.addControl('ort', this.ort);
    }
}
