import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { EMAIL_REGEX } from '../shared/kunde';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-email&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-email',
    templateUrl: './create-email.component.html',
    imports: [FormsModule, MatIconModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class CreateEmailComponent implements OnInit {
    @Input()
    form!: FormGroup;

    protected readonly email = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
    ]);

    ngOnInit() {
        log.debug('CreateEmailComponent.ngOnInit');
        this.form.addControl('email', this.email);
    }
}
