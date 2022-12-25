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
 * Komponente f&uuml;r den CSS-Selektor <code>hs-update-email</code>
 */
@Component({
    selector: 'hs-update-email',
    templateUrl: './update-email.component.html',
    imports: [FormsModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class UpdateEmailComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    // <hs-update-email [form]="form" [currentValue]="...">
    @Input()
    form!: FormGroup;

    @Input()
    currentValue!: string;

    protected email!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateEmailComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.email = new FormControl(this.currentValue, [
            Validators.required,
            Validators.minLength(UpdateEmailComponent.MIN_LENGTH),
            Validators.pattern(/^\w/u),
        ]);
        this.form.addControl('email', this.email);
    }
}
