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
    selector: 'hs-create-username',
    templateUrl: './create-username.component.html',
    imports: [FormsModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class CreateUsernameComponent implements OnInit {
    private static readonly MAX_LENGTH = 20;

    @Input()
    form!: FormGroup;

    protected readonly username = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateUsernameComponent.MAX_LENGTH),
    ]);

    ngOnInit() {
        log.debug('CreateUsernameComponent.ngOnInit');
        this.form.addControl('username', this.username);
    }
}
