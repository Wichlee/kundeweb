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
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-password&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-password',
    templateUrl: './create-password.component.html',
    imports: [
        FormsModule,
        MatIconModule,
        MatInputModule,
        NgIf,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class CreatePasswordComponent implements OnInit {
    private static readonly MIN_LENGTH = 8;

    @Input()
    form!: FormGroup;

    protected readonly password = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreatePasswordComponent.MIN_LENGTH),
    ]);

    ngOnInit() {
        log.debug('CreatePasswordComponent.ngOnInit');
        this.form.addControl('password', this.password);
    }
}
