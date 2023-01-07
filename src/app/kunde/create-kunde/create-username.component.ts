import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-username&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-username',
    templateUrl: './create-username.component.html',
    imports: [FormsModule, MatIconModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class CreateUsernameComponent implements OnInit {
    private static readonly MAX_LENGTH = 20;

    @Input()
    form!: FormGroup;

    protected readonly username = new FormControl(undefined, [
        Validators.required,
        Validators.maxLength(CreateUsernameComponent.MAX_LENGTH),
    ]);

    ngOnInit() {
        log.debug('CreateUsernameComponent.ngOnInit');
        this.form.addControl('username', this.username);
    }
}
