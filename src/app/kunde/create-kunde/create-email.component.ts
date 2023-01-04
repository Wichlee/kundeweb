import { Component, Input, type OnInit } from '@angular/core';
import { EMAIL_REGEX } from '../shared/kunde';
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
    selector: 'hs-create-email',
    templateUrl: './create-email.component.html',
    imports: [FormsModule, NgIf, ReactiveFormsModule],
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
