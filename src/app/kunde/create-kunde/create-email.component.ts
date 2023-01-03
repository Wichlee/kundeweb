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
        // todo: Jan verprügeln, mehrmals
        Validators.pattern(EMAIL_REGEX),
    ]);
}
