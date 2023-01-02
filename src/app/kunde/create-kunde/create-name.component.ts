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

@Component({
    selector: 'hs-create-name',
    templateUrl: './create-name.component.html',
    imports: [FormsModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class CreateNameComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    @Input()
    form!: FormGroup;

    protected readonly nachname = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateNameComponent.MIN_LENGTH),
        Validators.pattern(/^\w/u),
    ]);

    ngOnInit() {
        log.debug('CreateNameComponent.ngOnInit()');

        this.form.addControl('nachname', this.nachname);
    }
}
